const express = require("express");
const {blockUser,getAllblockedPerson} = require('../modules/admin/addblockControllers.js');
const {reportUser,getAllReportedPerson}= require('../modules/admin/addReportController.js');
const checkUserAuth=require('../modules/authentication/authaTokenCheck.js')
 
const router = express.Router();
//Public routes
router.post('/blockUser',checkUserAuth,blockUser);
router.get("/getAllblockedPerson",getAllblockedPerson);
router.post('/reportUser',checkUserAuth,reportUser);
router.get("/getAllReportedPerson",getAllReportedPerson);

module.exports = router