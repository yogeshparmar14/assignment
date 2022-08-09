const mongoose = require("mongoose");
const date = new Date().getTime();
const blockSchema = new mongoose.Schema({
   
    blockedUserName:{type:String,required:true},
    reportedUserEmail:{type:String,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean}
    

})

const userModel = mongoose.model("blockuser",blockSchema)

module.exports = userModel;