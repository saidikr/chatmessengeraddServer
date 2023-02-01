const mongoose=require('mongoose')

const whatsAppSchema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received: Boolean,
    time:String,
})


const Message = mongoose.model('messageContent',whatsAppSchema);

module.exports = Message;