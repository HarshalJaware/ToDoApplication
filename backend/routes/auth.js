const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ status:"false",message: "User is already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.status(201).json({ status:"success",message: "You registered successfully.", userId: user._id });
});

router.post("/login", async (req, res) => {
  //destructure the request body
  const { email, password } = req.body;

  //check user is exist and password is mtached or not
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ status:"false",message: "You entered a invalid credentials." });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
