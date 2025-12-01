const Setup = require("../../models/setup/setup");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../utils/cloudinary");

// company setup
const companySetup = asyncHandler(async (req, res) => {
  const { name, phone, email, mobile, address, desc } = req.body;

  try {
    const logo = req.files ? req.files.logo : undefined;
    let logoResult;

    if (logo) {
      logoResult = await cloudinary.uploader.upload(logo.tempFilePath, {
        folder: "mabruuk",
      });
    }

    if (isNaN(phone) && isNaN(mobile)) {
      return res.status(400).json({ msg: "Invalid phone or mobile" });
    }

    const setupt = new Setup({
      email: email,
      name: name,
      phone: phone,
      mobile: mobile,
      address: address,
      desc: desc,
      logo: logoResult ? logoResult.secure_url : undefined,
    });

    await setupt.save();
    res.status(201).json({ msg: "Restaurent setup successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// edit company setup
const updateCompanySetup = asyncHandler(async (req, res) => {
  const { name, phone, email, mobile, address, desc } = req.body;

  try {
    if (phone !== undefined && isNaN(phone)) {
      return res.status(400).json({ msg: "Invalid phone number" });
    }

    if (mobile !== undefined && isNaN(mobile)) {
      return res.status(400).json({ msg: "Invalid mobile number" });
    }

    const logo = req.files ? req.files.logo : undefined;
    let logoResult;

    if (logo) {
      logoResult = await cloudinary.uploader.upload(logo.tempFilePath, {
        folder: "mabruuk",
      });

      const setup = await Setup.findByIdAndUpdate(
        req.params.id,
        {
          email: email,
          name: name,
          phone: phone !== undefined ? parseInt(phone) : undefined,
          mobile: mobile !== undefined ? parseInt(mobile) : undefined,
          address: address,
          desc: desc,
          logo: logoResult ? logoResult.secure_url : undefined,
        },
        { new: true, runValidators: true }
      );
    } else {
      const setup = await Setup.findByIdAndUpdate(
        req.params.id,
        {
          email: email,
          name: name,
          phone: phone !== undefined ? parseInt(phone) : undefined,
          mobile: mobile !== undefined ? parseInt(mobile) : undefined,
          address: address,
          desc: desc,
        },
        { new: true, runValidators: true }
      );
    }

    res.status(201).json({ msg: "Restaurent Updated" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Restaurent Set Not Found" });
    }
    res.status(500).json(error.msg);
  }
});

// get Company
const getCompany = asyncHandler(async (req, res) => {
  try {
    const setup = await Setup.find().sort("-createdAt");
    res.status(200).json(setup);
  } catch (error) {
    res.status(500).json(error.msg);
  }
});

module.exports = {
  companySetup,
  updateCompanySetup,
  getCompany,
};
