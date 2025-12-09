const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Provider = require("../models/provider");
require("dotenv").config();

const providerAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get provider from the token
      req.provider = await Provider.findById(decoded.id).select("-password");

      if (!req.provider) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized, No Token" });
  }
});

const userAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log(req.headers);
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(process.env.JWT_SECRET, "2");
      // Get user from the token
      const user = await User.find();

      // console.log(user, "user");
      // console.log(decoded, "5");
      let myuser = await Provider.findById(decoded.id);
      // console.log(myuser, "9");
      req.user = await Provider.findById(decoded.id).select("-password");
      // console.log(req.user, "3");

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized, No Token" });
  }
});

const authCheck = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let userOrProvider;
      // Check if the token belongs to a user or provider
      if (decoded.role === "user") {
        userOrProvider = await User.findById(decoded.id).select("-password");
      } else if (decoded.role === "provider") {
        userOrProvider = await Provider.findById(decoded.id).select(
          "-password"
        );
      } else {
        throw new Error("Invalid role specified in token");
      }

      if (!userOrProvider) {
        throw new Error("User or Provider not found");
      }

      // Set the user or provider on the request object based on the token
      req.userOrProvider = userOrProvider;

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized, No Token" });
  }
});

module.exports = { userAuth, providerAuth, authCheck };
