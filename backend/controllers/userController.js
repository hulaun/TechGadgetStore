const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel"); // Đường dẫn tới model User
const router = express.Router();
const db = require("../models");


// Cập nhật thông tin người dùng
const updateUser =  async (req, res) => {
  try {

    console.log("req.params:", req.params); // Kiểm tra req.params

    const userId  = req.params.email;
    const { firstname, lastname, phoneNumber, gender, dob } = req.body;
    // Kiểm tra nếu người dùng tồn tại
    let user = await db.User.findOne({ email: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Cập nhật thông tin
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;

    // Lưu vào database
    await user.save();
    
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { updateUser};
  