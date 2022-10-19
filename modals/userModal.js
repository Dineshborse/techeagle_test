const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userInfo = mongoose.model("userInfo", userInfoSchema);

module.exports = userInfo;