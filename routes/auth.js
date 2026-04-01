const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });

  await user.save();

  res.json({ message: "Usuario creado" });
});

router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN START");

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("USER:", user);

    if (!user) return res.status(400).json({ msg: "No existe usuario" });

    const valid = await bcrypt.compare(password, user.password);
    console.log("PASSWORD OK");

    if (!valid) return res.status(400).json({ msg: "Password incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    console.log("TOKEN GENERATED");

    res.json({ token });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err);
  }
});

module.exports = router;