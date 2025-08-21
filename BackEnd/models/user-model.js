const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    orders:[{
       type:mongoose.Schema.Types.ObjectId,
       ref: 'product', 
    }],
    contact:Number,
    picture:String

},{timestamps:true})


module.exports= mongoose.model("user",userSchema)