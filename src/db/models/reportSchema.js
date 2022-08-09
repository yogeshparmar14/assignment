const mongoose = require("mongoose");
const date = new Date().getTime();
const reportSchema = new mongoose.Schema({
   
    reportedUserName:{type:String,required:true},
    reportedUserEmail:{type:String,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean}
    

})

const userModel = mongoose.model("reportuser",reportSchema)

module.exports = userModel;