const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    description:{
        type: String,
        trim: true,
        required: true, 
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


module.exports = mongoose.model("Workshops", categorySchema);
