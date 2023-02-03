const Message = require("../models/message")
const { getTime } = require("../services/timeFormat")



exports.addOneMessage=async (req,res)=>{
    const {message,groupId,userId}=req.body;
    const time=getTime();
    const dbMessage={message,groupId,userId,time}
    Message.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
}


exports.syncmessages =(req, res) => {
    Message.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}