const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    time:String,
    token:String,
})


const User = mongoose.model('users',userSchema);

module.exports = User;