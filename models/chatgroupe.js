const mongoose=require('mongoose')

const chatGroup=mongoose.Schema({
    name:String,
    time:String,
})


const ChatGroup = mongoose.model('groups',chatGroup);

module.exports = ChatGroup;