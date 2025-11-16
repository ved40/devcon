const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const event = mongoose.model("event", eventSchema);
module.exports = event;