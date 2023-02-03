const express = require("express");
const router = express.Router();
const groupController = require('../../controllers/groupController')



module.exports=()=>{
    router.post("/group/new",groupController.addGroup);
    return router;
};