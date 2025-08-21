const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/controllers/isLoggedin')
const productModel = require('../models/product-model')
const userModel = require('../models/user-model')

router.get('/', (req, res) => {
    let error = req.flash('error')
    res.render('index', { error , loggedin:false })
})

router.get('/shop',isLoggedIn,async (req,res)=>{
    let product = await productModel.find()
    res.render('shop',{product})
})

router.get('/addtocart/:id',isLoggedIn,async (req,res) => {
    let user = await userModel.findOne({user: req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    

})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    req.flash('success',"Logged out successfully")
    res.redirect('/')
})

module.exports = router;