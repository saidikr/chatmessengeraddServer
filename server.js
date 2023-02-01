//importing
const express=require('express')
const mongoose=require('mongoose')
const apiRoutes=require('./routes')
const Pusher=require('pusher')
const cors=require('cors');
require("dotenv").config();



//app config
const app=express();
const port=process.env.PORT || 9000
const pusher = new Pusher({
  appId: "1543844",
  key: "eb05ff1342e028941747",
  secret: "703bd2cbb806acb7f834",
  cluster: "eu",
  useTLS: true
});


//middleware

app.use(express.json())
app.use(cors())
// app.use((req,res,next)=>{  hadi fi plaset cors
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Headers','*');
//     next();
// })


//DB config
const connection_url='mongodb+srv://said:said.123456789s@cluster0.kqi7njd.mongodb.net/chatappDB?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

const db=mongoose.connection;

db.once("open", function() {
        console.log("DB Connected");
    const msgCollection=db.collection("messagecontents");
    const changeStream=msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log(change);
        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('message','inserted',{
                _id:messageDetails._id,
                message:messageDetails.message,
                name:messageDetails.name,
                timestamp:messageDetails.timestamp,
                received: messageDetails.received,
                time:messageDetails.time,
                __v:messageDetails.__v
            });
        }else{
            console.log('Error triggering Pusher')
        }
    })
    });

//????


//api routes
app.use("/", apiRoutes());

app.listen(port,()=>console.log(`Listening on port : ${port}`))