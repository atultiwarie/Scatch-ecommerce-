const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:Buffer,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    name:String,
    bgcolor:String,
    panelcolor:String,
    textcolor:String,

},{timestamps:true})

module.exports = mongoose.model("product", productSchema)