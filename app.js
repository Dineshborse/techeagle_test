const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userInfo = require("./modals/userModal");
require("dotenv").config();
var net = require('net');
// const { ok } = require("assert");

const userController = require("./routes/user");

//for supporting json(body parser middleware)
app.use(cors());
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))


mongoose.connect("mongodb+srv://dineshborse:mangalborse@cluster0.umsb4.mongodb.net/TE-drone?retryWrites=true&w=majority").then((data) => {
    console.log("connected to database")
}).catch((err) => {
    console.log(err);
})
app.listen(process.env.PORT || 5000, (err) => {
    if (!err) {
        console.log("server started on port 5000");
    }
    else {
        console.log(err);
    }
})



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

let current_monitor_response = {};
const controlCommands = { rtl: "False", start: "False", locations: "", isLocationSet: "False" };
const servoActuationStatus = { status: "ok", servo: "False" };
const droneConnectionStatus = { status: "ok", connectionStatus: "False" };


app.get("/monitor", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    res.status(200).send(current_monitor_response);
})
app.post("/data", (req, res) => {
    // console.log(req.body);
    current_monitor_response = req.body;
    if (req.body.reset === "True") {
        controlCommands.rtl = "False"
        controlCommands.start = "False"
        controlCommands.locations = ""
        controlCommands.isLocationSet = "False"
    }
    res.status(200).send({ status: "ok", message: "recieved data", ...controlCommands });
})
app.get("/rtl-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    controlCommands.rtl = "True"
    res.status(200).send({ status: "ok", message: "recieved data", ...controlCommands });
})

app.get("/start-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    controlCommands.start = "True"
    res.status(200).send({ status: "ok", message: "recieved data", ...controlCommands });
})
app.get("/reset-control-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    controlCommands.rtl = "False"
    controlCommands.start = "False"
    controlCommands.locations = ""
    controlCommands.isLocationSet = "False"
    res.status(200).send({ status: "ok", message: "recieved data", ...controlCommands });
})

app.post("/set-start-end-locations-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    console.log(req.body.locations)
    if (req.body.locations !== "") {
        controlCommands.locations = req.body.locations
        controlCommands.isLocationSet = "True"
    }


    res.status(200).send({ status: "ok", message: "recieved data", ...controlCommands });
})

app.get("/gcs-connect-to-drone-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    droneConnectionStatus.connectionStatus = "True";
    res.status(200).send(droneConnectionStatus);
})
app.get("/servo-read-status-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    res.status(200).send(servoActuationStatus);
})
app.get("/servo-set-status-ec645b6577c7135ab7ebe510ed45f0690b", (req, res) => {
    // console.log("inside Get")
    // res.send("all ok");
    // console.log(req.body);
    servoActuationStatus.servo = "True"
    res.status(200).send(servoActuationStatus);
})
app.use("/user", userController);