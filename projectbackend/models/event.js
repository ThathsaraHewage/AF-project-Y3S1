const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String  
    },
    note:{
        type: String  
    },
    startingtime:{
        type: String
    },
    endingtime:{
        type: String
    },
    date:{
        type: String
    },
    venue:{
        type: String
    },
    approved:{
        type: String
    },
},{timestamps: true});


module.exports = mongoose.model("Event", eventSchema);
