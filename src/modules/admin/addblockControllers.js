const userModel=require("../../db/models/reportSchema")
const blockUser = async (req,res)=>{
    const {blockedUserNameblockedUserEmail} = req.body
    if(!blockedUserName ||!blockedUserEmail)
    return res.send({"message":"All fields are required","status":400}) 
    try {
        
        const doc = new userModel({
            blockedUserName,
            reportedUserEmail,
        })
        await doc.save()
        res.send({"message":`${dishName} is added successfully!`, "status":200,
        "data":{
            "blockedUserName":`${blockedUserName}`,
            "blockedUserEmail":`${blockedUserEmail}`}
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to block user","status":403})
    }
}

const getAllblockedPerson = async (req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(403).json({"message":"Unable to block report person"})
    }
}

module.exports = {blockUser,getAllblockedPerson}