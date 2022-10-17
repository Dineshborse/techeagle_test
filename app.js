const express = require("express");

const app = express();
const cors = require("cors");
var net = require('net');

//for supporting json(body parser middleware)
app.use(cors());
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))


app.listen(process.env.PORT || 5000, (err) => {
    if (!err) {
        console.log("server started on port 5000");
        console.log(`server running on ${process.env.PORT}`)
    }
    else {
        console.log(err);
    }
})



var net = require('net');
const { ok } = require("assert");

// var client = new net.Socket();
// client.connect(5000, '127.0.0.1', function () {
//     console.log('Connected');
//     client.write('GET'); // send acknowledge to request data
// });

// let flag = false;
// // Call this callback to fetch data
// // let intervalId =setInterval(() => {
// // 	if(flag){
// // 		client.write('GET');
// // 		flag=false;
// // 	}
// // }, 1000);
// let lastMessage = "";
// client.on('data', function (data) {
//     // console.log("yes")
//     // client.write('GET');
//     flag = true;
//     console.log('Received: ' + data);
    
    
//     var jsondata = JSON.parse(data);
//     let temp = jsondata.long;
//     jsondata.long=jsondata.lat;
//     jsondata.lat =temp;
//     lastMessage = JSON.stringify(jsondata);
//     console.log(jsondata); // "mode" field is parsed
//     //client.destroy(); // kill client after server's response
// });



// app.get("/", (req, res) => {
//     // console.log("inside Get")
//     res.send(lastMessage);
//     client.write('GET');
// })



app.get("/", (req, res) => {
    // console.log("inside Get")
    res.send("all ok");
    console.log(req.body);
})
app.post("/test",(req,res)=>{
    console.log(req.body);
    res.send({status: "ok", message: "recieved data"});
})