const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/controllers/isLoggedin')

router.get('/', (req, res) => {
    let error = req.flash('error')
    res.render('index', { error })
})

router.get('/shop',isLoggedIn,(req,res)=>{
    res.render('shop')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    req.flash('success',"Logged out successfully")
    res.redirect('/')
})

module.exports = router;