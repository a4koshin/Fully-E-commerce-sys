const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/Token");
const cloudinary = require("../utils/cloudinary");
const driver = require("../models/inventory/driver");

// Function to create a new user or register

const createClient = asyncHandler(async (req, res) => {
  try {
    console.log("hell0 server side");
    const { name, phone, email, status, roles } = req.body;

    // if (!name || !phone || !email  || !roles ) {
    //   return res.status(400).json({ msg: "All fields are required" });
    // }

    // emailexist
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
      if (emailExist.verify === false) {
        return res.status(400).json({ msg: "Please verify your account" });
      } else {
        return res.status(404).json({ msg: "Email already exist" });
      }
    } else {
      const verifyUrl = `http://localhost:5173/verify/${req.body.email}`;

      const image = req.files.image;
      // ? req.files.image : undefined;
      let imageResult;

      if (image) {
        // If an image is provided, upload it to Cloudinary
        imageResult = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "user",
        });
      }
      console.log(req.files, "req.files");

      if (isNaN(phone)) {
        return res.status(400).json({ msg: "Invalid phone" });
      }

      const newUser = new User({
        name,
        phone,
        email,
        image: imageResult ? imageResult.secure_url : undefined,
        status,
        roles,
      });
      await newUser.save();
      return res.status(201).json({ msg: "User created" });

      const message = `
  <h2>Welcome To Somali Fast Food</h2>
  <h3>Hi ${newUser?.name}</h3>
  <p>You have just verify Somali Fast Food account.</p>
  <p>This verify link for you account.</p>
  <a href=${verifyUrl} click tracking=off> ${verifyUrl} </a>
  <p>Thank you</p>
  <p>The Somali Fast Food Support Team</p>
`;

      const subject = "Verify Your Account";
      const send_to = newUser?.email;
      const sent_from = process.env.EMAIL_USER;

      await sendEmail(subject, message, send_to, sent_from);

      await sendEmail(subject, message, send_to, sent_from);

      res.status(201).json({ msg: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Registration failed" });
  }
});

const verifyClient = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;

    const client = await User.findOneAndUpdate(
      { email },
      { verify: true },
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Account verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Verification failed" });
  }
});

const loginClient = asyncHandler(async (req, res) => {
  try {
    const { email, phone } = req.body;

    // if (!email && !phone) {
    //   return res.status(400).json({ msg: "Email or Phone is required" });
    // }

    const client = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    if (client.status !== 0) {
      return res.status(403).json({ msg: "Account is closed" });
    }

    if (!client.verify) {
      return res.status(403).json({ msg: "Please verify your email first" });
    }

    const token = generateToken(client._id);

    res.status(200).json({
      name: client.name,
      email: client.email,
      phone: client.phone,
      image: client.image,
      role: client?.roles,
      token: token,
      id: client._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getAllClients = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// Function to update a user's profile
const updateClient = asyncHandler(async (req, res) => {
  const { name, phone, email, status, roles } = req.body;

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

      await User.findByIdAndUpdate(
        userId,
        {
          name,
          phone,
          image: result.secure_url,
          status,
          email,
          roles,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          name,
          phone,
          status,
          email,
          roles,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({ msg: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Update failed" });
  }
});

// Function to get a user by ID
const getClientById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching user" });
  }
});

// const changePassword = asyncHandler(async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;

//     // Check if the  is correct
//     const user = await User.findById(req.params.id);
//     const passwordMatch = await bcrypt.compare(oldPassword, u);
//     if (!passwordMatch)
//       return res.status(400).json("Old Password is incorrect");

//     // Hash the
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the use
//     await User.findByIdAndUpdate(
//       req.params.id,
//   : hashedPassword },
//       { new: true, runValidators: true }
//     );
//     res.status(200).json({ msg: "Password changed successfully" });
//   } catch (error) {
//     if (error.kind == "ObjectId") {
//       return res.status(400).json({ msg: "User Id not found" });
//     }
//     res.status(500).json({ msg: error.message });
//   }
// });

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   try {
//     if (!user) {
//       return res.status(404).json({ msg: "User Not Found" });
//     }

//     //Delete token if exist in DB
//     let token = await Token.findOne({ email: user.email });

//     if (token) {
//       await token.deleteOne();
//     }

//     //create reset token
//     let resetToken = crypto.randomBytes(32).toString("hex") + user.email;

//     //hash token before saving
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     // Save token to DB
//     await new Token({
//       email: user.email,
//       token: hashedToken,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 30 * (60 * 1000), // thirty minute
//     }).save();

//     const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

//     const message = `
//     <h2>Welcome To Diamond Exchange</h2>
//     <h3>Hi ${user?.name}</h3>
//     <p>You have just requested a  for your Diamond account.</p>
//     <p>To confirm t request, click the button below:</p>
//     <p>This reset link is valid for only 30 Minutes.</p>
//     <a href=${resetUrl} click tracking=off> ${resetUrl} </a>
//     <p>If you did not reques reset, please ignore this email.</p>
//     <p>Thank you</p>
//     <p>The Diamond Exchange Support Team</p>
//   `;

//     const subject = "Password Reset Request";
//     const send_to = user?.email;
//     const sent_from = process.env.EMAIL_USER;

//     await sendEmail(subject, message, send_to, sent_from);

//     await sendEmail(subject, message, send_to, sent_from);
//     res.status(200).json({ msg: "Reset Email Sent" });
//   } catch (error) {
//     return res.status(500).json("Email not sent, please try again ");
//   }
// });

// const resetPassword = asyncHandler(async (req, res) => {
//   cons } = req.body;
//   const { resetToken } = req.params;

//   //Hash token, then compare to token in DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   //find token in db
//   const userToken = await Token.findOne({
//     token: hashedToken,
//     expiresAt: { $gt: Date.now() },
//   });

//   if (!userToken) {
//     return res.status(404).json({ msg: "Invalid token" });
//   }
//   //find user
//   const user = await User.findOne({ email: userToken.email });

//   // Hash the
//   const hashedPassword = await bcrypt.h, 10);

//   u = hashedPassword;
//   await user.save();
//   return res.status(200).json("Password reset successful, please login");
// });

module.exports = {
  createClient,
  loginClient,
  getAllClients,
  updateClient,
  getClientById,
  verifyClient,
  // changePassword,
  // forgotPassword,
  // resetPassword,
  // verifyClient,
};
