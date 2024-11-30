const mongoose = require("mongoose");

const LuggageSchema = new mongoose.Schema({
    luggageID: {
        type : String,
    },
    ownerName: {
        type : String,
        required : true
    },
    receverName: {
        type : String,
    },
    ownerPhone: {
        type : String,
        required : true
    },
    receverPhone: {
        type : String,
    },

    ownerEmail: {
        type : String,
        required : true
    },

    busNum1: {
        type : String,
    },

    startLoc: {
        type : String,
    },

    placeOfDelivery: {
        type : String,
        required : true
    },

    dptTime: {
        type : String,
    },

    arivalTime: {
        type : String,
    },

    weight: {
        type : Number,
        required : true
    },
    height: {
        type : Number,
    },
    length: {
        type : Number,
    },
    width: {
        type : Number,
    },
    contents: {
        type : String,
        required : true
    },
});

module.exports =Luggage = mongoose.model("luggage", LuggageSchema);

