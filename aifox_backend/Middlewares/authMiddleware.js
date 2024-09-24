
const JWT = require("jsonwebtoken")
const Person = require("../models/userModel.js")

require("dotenv").config({ path: '../.env' });

// Protected routes, token-based
const requireSignIn = async (req, res, next) => {

  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "token not found" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {

    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Person.findOne({ email_id: decoded.email });

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "invalid token" });
  }
};

// Middleware for admin access
const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await Person.findOne({ email_id: req.user.email_id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};



module.exports = {
  requireSignIn,
  isAdmin,
};
