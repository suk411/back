import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  uid: Number,
  balance: Number,
});

export default mongoose.model("User", userSchema);
