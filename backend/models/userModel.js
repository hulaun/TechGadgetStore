const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
  firstname: { type: String, default: "firstname" },
  lastname: { type: String, default: "lastname" },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phoneNumber: { type: String, default: "1234567890" },
  gender: { type: String, enum: ["male", "female", "other"], default: "other"},
  dob: { type: Date, default: Date.now },
  password: { type: String, required: [true, "Password is required"] },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
