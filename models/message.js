const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    message:String,
    groupId:String,
    userId:String,
    time:String,
})


const Message = mongoose.model('messages',messageSchema);

module.exports = Message;