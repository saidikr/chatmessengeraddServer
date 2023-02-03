const ChatGroup = require("../models/chatgroupe")
const { getTime } = require("../services/timeFormat")



exports.addGroup=async (req,res)=>{
    const {name}=req.body;
    const time=getTime();
    const dbGroup={name,time}
    ChatGroup.create(dbGroup,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new group created: \n ${data}`)
        }
    })
}