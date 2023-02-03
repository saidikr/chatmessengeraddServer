const Message = require("../models/MessagesModel")
const { getTime } = require("../services/timeFormat")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/user")


// user registration
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName} =
      req.body;
    // form validation server side
    if (
      !(email && password && firstName && lastName )
    ) {
      return res.status(400).send("all input are required");
    }

    // check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User ALeready exists, Please login");
    }
    
    const time=getTime();
    // Ecrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);


    // saving our new created instance
    const savedUser = await User.create({
      email,
      password: encryptedPassword,
      firstName,
      lastName,
      time,
    });

    // generate token
    const token = jwt.sign(
      { user_id: savedUser._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    // save user token
    savedUser.token = token;

    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
/// login a user
exports.login = async (req, res) => {
  try {
    //Get user input
    const { email, password } = req.body;
    //validate user input
    if (!(email && password)) {
      return res.status(400).send("All input are required");
    }
    // validate if usrr exists in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create a token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      // register user token
      user.token = token;

      // response
      res.status(200).send(user);
    } else {
      res.status(409).send("incorrect email or password");
    }
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};
exports.addmessages =(req, res) => {
    const {message,name,timestamp,received}=req.body
    const time=getTime();
    const dbMessage={message,name,timestamp,received,time}
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