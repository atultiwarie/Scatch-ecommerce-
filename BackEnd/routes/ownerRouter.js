const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model')

router.get('/admin', (req,res)=>{
    let success = req.flash('success')
    res.render("createproducts", { success });
})

router.post('/create',async (req,res) => {
    let owners = await ownerModel.find()
    if(owners.length > 0) return res.status(503).send("Owner already exists")

    const {email, fullname, password} = req.body
    if(!email || !fullname || !password) return res.status(400).send("All fields are required")
    let createdOwner = await ownerModel.create({
        email,
        fullname,
        password
    })
    // res.status(201).send(createdOwner)
    
    res.render("createproducts", { success: "Owner created successfully!" });
})

module.exports = router