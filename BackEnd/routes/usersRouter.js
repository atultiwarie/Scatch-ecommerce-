const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')
const userModel = require('../models/user-model')

router.get('/', (req,res)=>{
    res.send('its working')
})



router.post('/register',)

router.post('/login', async (req,res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("All fields are required");
      const user = await userModel.findOne({ email });
      if (!user) return res.status(400).send("Invalid credentials");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");
      const token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/users/dashboard");
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router