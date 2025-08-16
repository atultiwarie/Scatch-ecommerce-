const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../utils/generateToken");
const userModel = require("../../models/user-model");



module.exports.registerUser = async function (req, res) {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res.status(400).send("All fields are required");
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user)
    res.cookie('token',token)

    res.send("User created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.loginUser = async (req,res) => {
  try {
    const {email,password}= req.body;
    if(!email || !password) return res.status(400).send('All fields are required')
    const  user = await userModel.findOne({email})
    if(!user)return res.status(400).send('Invalid credentials')
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).send('Invalid credentials')
    const token = generateToken(user)
    res.cookie('token',token)
    res.send('Login successful')  
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
  
}


module.exports.logout = (req,res)=>{
  res.clearCookie('token',"")
  req.flash('success',"Logged out successfully")
  res.redirect('/')
}
