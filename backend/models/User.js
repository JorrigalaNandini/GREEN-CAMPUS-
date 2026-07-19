
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    department: { type: String, required: true },
    ecoPoints: { type: Number, default: 0 },
    badge: { type: String, default: "Eco Starter" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);