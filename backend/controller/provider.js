const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Provider = require("../models/provider");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/Token");
const cloudinary = require("../utils/cloudinary");




const registerProvider = asyncHandler(async (req, res) => {
  try {
    const { name, phone, email, password, roles } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // emailexist
    const emailExist = await Provider.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(404).json({ msg: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image = req.files.image 
    // ? req.files.image : undefined;
    let imageResult;

    if (image) {
      // If an image is provided, upload it to Cloudinary
      imageResult = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "mabruuk",
      });
    }
    console.log(req.files,'req.files')

    if (isNaN(phone)) {
      return res.status(400).json({ msg: "Invalid phone" });
    }

    const newUser = new Provider({
      name,
      phone,
      email,
      roles,
      password: hashedPassword,
      image: imageResult ? imageResult.secure_url : undefined,
    });
    await newUser.save();

    res.status(201).json({ msg: "Provider registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Function for user login
const loginProvider = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !req.body.password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await Provider.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Email not found" });
    }

    //checking the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    //validate the password
    if (!validPass) {
      res.status(404);
      return res.status(404).json({ msg: "Incorect Password" });
    }

    if (user.status === 0) {
      if (user && validPass) {
        const token = generateToken(user._id);

        res.status(200).json({
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          roles: user.roles,
          token: token,
          id: user.id,
        });
      } else {
        return res.status(404).json({ msg: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ msg: "Account Closed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login failed" });
  }
});

// Function to get all users
const getAllProviders = asyncHandler(async (req, res) => {
  try {
    const users = await Provider.find().sort("-createdAt");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// Function to update a user's profile
const updateProvider = asyncHandler(async (req, res) => {
  const { name, phone, roles } = req.body;

  try {
    const image = req.files ? req.files.image : undefined;

    const userId = req.params.id;
    if (image) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "mabruuk",
      });

      if (isNaN(phone)) {
        return res.status(400).json({ msg: "Invalid phone" });
      }

      await Provider.findByIdAndUpdate(
        userId,
        {
          name,
          phone,
          roles,
          image: result.secure_url,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await Provider.findByIdAndUpdate(
        userId,
        {
          name,
          phone,
          roles,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({ msg: "Profile updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Update failed" });
  }
});

// Function to get a user by ID
const getProviderById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Provider.findById(userId)

    if (!user) {
      return res.status(404).json({ msg: "Provider not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching user" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Check if the old password is correct
    const user = await Provider.findById(req.params.id);
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch)
      return res.status(400).json("Old Password is incorrect");

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await Provider.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Provider Id not found" });
    }
    res.status(500).json({ msg: error.message });
  }
});
const getProviderProfile = asyncHandler(async (req, res) => {

 try {
    const provider = await Provider.findById(req.user.id).select("-password");
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Provider.findOne({ email });

  try {
    if (!user) {
      return res.status(404).json({ msg: "Provider Not Found" });
    }

    //Delete token if exist in DB
    let token = await Token.findOne({ email: user.email });

    if (token) {
      await token.deleteOne();
    }

    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user.email;

    //hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to DB
    await new Token({
      email: user.email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // thirty minute
    }).save();

    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

    const message = `
  <h2>Welcome To Diamond Exchange</h2>
  <h3>Hi ${user?.name}</h3>
  <p>You have just requested a new password for your Diamond account.</p>
  <p>To confirm this password request, click the button below:</p>
  <p>This reset link is valid for only 30 Minutes.</p>
  <a href=${resetUrl} click tracking=off> ${resetUrl} </a>
  <p>If you did not request a password reset, please ignore this email.</p>
  <p>Thank you</p>
  <p>The Diamond Exchange Support Team</p>
`;

    const subject = "Password Reset Request";
    const send_to = user?.email;
    const sent_from = process.env.EMAIL_USER;

    // await sendEmail(subject, message, send_to, sent_from);

    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ msg: "Reset Email Sent" });
  } catch (error) {
    return res.status(500).json("Email not sent, please try again ");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  //Hash token, then compare to token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //find token in db
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(404).json({ msg: "Invalid token" });
  }
  //find user
  const user = await Provider.findOne({ email: userToken.email });

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();
  return res.status(200).json("Password reset successful, please login");
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerProvider,
  loginProvider,
  getAllProviders,
  updateProvider,
  getProviderById,
  changePassword,
  forgotPassword,
  resetPassword,
  getProviderProfile
};
