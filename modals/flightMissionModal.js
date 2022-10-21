const mongoose = require("mongoose");

const flightMissionSummarySchema = new mongoose.Schema({
    DateCreated: {
        type: Date,
        required: true
    },
    MissionFIleName: {
        type: String,
        required: true
    },
    StartTime:{
        type: Date
    },
    EndTime:{
        type: Date
    },
    TimeTaken:{
        type: Number,
        default:0
    },
    StartLocation:{
        type: String
    },
    EndLocation:{
        type: String
    },
    DistanceCoverved:{
        type:Number
    }
})

const flightMissionSummary = mongoose.model("flightMissionSummary", flightMissionSummarySchema);

module.exports = flightMissionSummary;