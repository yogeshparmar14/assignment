const mongoose =require("mongoose");

//defining schema
const date = new Date().getTime();

const registerSchema = new mongoose.Schema({
   
    name:{type:String,required:true,trim:true},
    city:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean},
    userType:{type:String,default:"USER",trim:true}
})


//model

const userModel = mongoose.model("userdata",registerSchema)
module.exports = userModel;