const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const userInfo = require("../modals/userModal");


const { generatePasswordHash, checkIfUserExists, checkUserPassword } = require("../utility");

const notificationsMap = new Map();

router.post("/register", async (req, res) => {
    // console.log(req.body.useremail, req.body.password)
    // console.log(await checkIfUserExists(req.body.useremail))
    if (await checkIfUserExists(req.body.useremail)) {
        res.status(400).send({ status: "failed", message: "user email already exists" })
    }
    else {
        let passwordHash = await generatePasswordHash(req.body.password);
        console.log(passwordHash)
        userInfo.create({ useremail: req.body.useremail, password: passwordHash, userName: req.body.username }).then((val) => {
            console.log(val);
            res.status(200).send({ status: "success", message: "User registered successfully" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "failed", message: "Server DB error" })
        })
    }
})


router.post("/login", async (req, res) => {
    console.log("req.body")
    userInfo.find({ useremail: req.body.useremail }).then(users => {
        if (users.length) {
            checkUserPassword(req.body.useremail, req.body.password).then((val => {
                if (val) {
                    console.log(val)
                    try {
                        let token = jwt.sign(req.body.useremail, process.env.SECRET_KEY);
                        res.status(200).send({ status: "success", token: token, userName: users[0].userName, userEmail:users[0].useremail })
                    }
                    catch (err) {
                        console.log(err)
                        res.status(400).send({ status: "failed", message: "server error" })
                    }
                }
                else {
                    res.status(400).send({ status: "failed", message: "password mismatch" })
                }
            }));
        }
        else {
            res.status(400).send({ status: "failed", message: "invalid user" })
        }

    })

})





module.exports = router;