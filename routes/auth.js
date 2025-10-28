import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  let nextUid = 484933;
  const lastUser = await User.findOne().sort({ uid: -1 });

  if (lastUser && typeof lastUser.uid === "number") {
    nextUid = lastUser.uid + 1;
  }

  await User.create({
    username,
    password,
    uid: nextUid,
    balance: 100,
  });

  res.json({ message: "Registered successfully", uid: nextUid });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user)
    return res.status(400).json({ error: "Invalid username or password" });

  res.json({
    message: "Login successful",
    user: { username: user.username, uid: user.uid, balance: user.balance },
  });
});

export default router;
