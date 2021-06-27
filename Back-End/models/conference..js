const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength:32,
    },
    description:{
        type: String,
        trim: true,
        required: true,
        maxlength:32,
    },
    hours:{
        type: Number,
        trim: true,
        required: true,
    },
    minutes:{
        type: Number,
        trim: true,
        required: true,
    },
    conductorsname:{
        type:String,
        trim:true,
        required:true,
    },
    resources:{
        type:String,
        trim:true,
        required:true,
    },
    ApprovalStatus:{
        type:String,
        default:"pending",
    },
    time:{
        type: String,
        default:"00:00"
    },
    venue:{
        type:String,
        default: "Hall 01"
    }
},{timestamps: true});


module.exports = mongoose.model("Conference", conferenceSchema);
