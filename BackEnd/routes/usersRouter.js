const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user-model')

router.get('/register', (req,res)=>{
    res.render('register')
})

router.post('/register', async (req,res)=>{
    try {
        const {fullname ,email,password} = req.body
        if(!fullname || !email || !password) return res.status(400).send('All fields are required')
        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.status(400).send('User already exists')

        const hashedPassword = await bcrypt.hash(password,10)
        await userModel.create({
            fullname,
            email,
            password: hashedPassword})
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login', async (req,res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("All fields are required");
      const user = await userModel.findOne({ email });
      if (!user) return res.status(400).send("Invalid credentials");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token);
      res.redirect("/users/dashboard");
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router