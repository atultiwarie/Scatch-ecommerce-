const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");
module.exports.registerUser = async function (req, res) {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res.status(400).send("All fields are required");
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.send("User created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
