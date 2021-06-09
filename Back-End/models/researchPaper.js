const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;

const productShema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description:{
        type:String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    authorsnames:{
        type:String,
        required: true,
        maxlength: 32,
        trim: true
    },
    numberofpages:{
        type: Number
    },
    ApprovalStatus:{
        type:String,
        default:"Approval Pending"
    },
    photo:{
        data: Buffer,
        contentType: String
    }
},{timestamps: true});

module.exports = mongoose.model("ResearchPapers", productShema);