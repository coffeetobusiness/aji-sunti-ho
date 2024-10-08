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
  password: {
    type: String,
    require: [true, "please provide a password"],
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "List",
    },
  ],
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
