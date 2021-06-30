const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;

const productShema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required: true,
    },
    description:{
        type:String,
        trim: true,
        required: true,
    },
    authorsnames:{
        type:String,
        required: true,
        trim: true
    },
    numberofpages:{
        type: Number
    },
    ApprovalStatus:{
        type:String,
        default:"Pending"
    },
    photo:{
        data: Buffer,
        contentType: String
    }
},{timestamps: true});

module.exports = mongoose.model("ResearchPapers", productShema);