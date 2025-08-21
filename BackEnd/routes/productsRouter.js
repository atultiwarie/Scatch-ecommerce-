const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')


router.post('/create', upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('Image is required');
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    })
        res.redirect('/owner/dashboard');
        res.redirect('owner/dashboard');
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router