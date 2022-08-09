const userModel=require("../../db/models/reportSchema")
const reportUser = async (req,res)=>{
    const {reportedUserName,reportedUserEmail} = req.body
    if(!reportedUserName ||!reportedUserEmail)
    return res.send({"message":"All fields are required","status":400}) 
    try {
        
        const doc = new userModel({
            reportedUserName,
            reportedUserEmail,
        })
        await doc.save()
        res.send({"message":`${dishName} is added successfully!`, "status":200,
        "data":{
            "reportedUserName":`${reportedUserName}`,
            "reportedUserEmail":`${reportedUserEmail}`}
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to report user","status":403})
    }
}

const getAllReportedPerson = async (req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(403).json({"message":"Unable to fatch report person"})
    }
}

module.exports = {reportUser,getAllReportedPerson}