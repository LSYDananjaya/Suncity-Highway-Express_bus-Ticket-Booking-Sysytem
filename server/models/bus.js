const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true
    },
    
    numberOfSeats: {
        type: Number,
        required: true
    },
    manufactureYear: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Bus", BusSchema);
