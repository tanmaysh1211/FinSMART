import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String,
    unique: true,
    lowercase: true,   
    trim: true },
  password: { type: String, required: true },   
  googleId: String,
});

export default mongoose.model("User", userSchema);
