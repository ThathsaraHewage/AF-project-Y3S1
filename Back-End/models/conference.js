const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        maxlength:32,
    },
    starttime:{
        type: String,
        trim: true,
        required: true,
    },
    endtime:{
        type: String,
        trim: true,
        required: true,
    },
    date:{
        type: String,
        trim: true,
        required: true,
    },
    venue:{
        type:String,
        trim:true,
        required:true,
    },
  
},{timestamps: true});


module.exports = mongoose.model("Conference", conferenceSchema);
