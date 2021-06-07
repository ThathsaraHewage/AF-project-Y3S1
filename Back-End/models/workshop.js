const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
    }
},{timestamps: true});


module.exports = mongoose.model("Category", categorySchema);
