import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a Username"],
    unique: true,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPas: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
