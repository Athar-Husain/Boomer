import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import Admin from "../Models/Admin.model.js";
import { generateToken } from "../utils/index.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const AdminRegister = asyncHandler(async (req, res) => {
  const { userId, email, mobile, password } = req.body;

  try {
    const existingUser = await Admin.findOne({
      $or: [{ email }, { userId }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or User ID already in use." });
    }

    const newAdmin = await Admin.create({
      userId,
      email,
      mobile,
      password,
    });

    res.status(201).json({
      message: "Admin Registered Successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await Admin.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { _id, userId, email, mobile } = user;

    res.status(200).json({
      _id,
      userId,
      email,
      mobile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
});



export const AdminLogin = asyncHandler(async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res
        .status(400)
        .json({ message: "User ID & Password are Required" });
    }

    const user = await Admin.findOne({ userId });
    if (!user) {
      return res.status(401).json({ message: "Invalid User. ID or password." });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid User ID or password." });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      // expires: new Date(Date.now() + 1000 * 86400), // 1 day
      expires: new Date(Date.now() + 1000 * 120), // 2 minutes
      sameSite: "none",
    });

    const { _id, email, mobile } = user;
    return res.status(200).json({
      _id,
      userId: user.userId,
      email,
      mobile,
      token,
    });
  } catch (error) {
    console.error("Error during Admin login:", error);
    return res
      .status(500)
      .json({ message: "An error occurred, please try again later." });
  }
});

export const getAdminLoginStatus = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json(false);

    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //   if (err) return res.status(403).json({ message: "Invalid token." });
    //   res
    //     .status(200)
    //     .json({ message: "User is logged in.", userId: decoded.id });
    // });

    const verified = jwt.verify(token, JWT_SECRET);

    if (verified) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 
