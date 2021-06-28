const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;

const MakePaymentsResearchPaperSchema = new mongoose.Schema({
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
    cardnumber:{
        type: Number,
        required: true,
        trim: true,
        maxlength:16
    },
    holdersname:{
        type:String,
        required: true,
        maxlength: 32,
        trim: true
    },
    code:{
        type: Number,
        required: true,
        trim : true,
        maxlength: 3
    },
    expiredate:{
        type:String,
        trim: true
    },
    photo:{
        data: Buffer,
        contentType: String
    }
},{timestamps: true});

module.exports = mongoose.model("ResearcherPayments", MakePaymentsResearchPaperSchema);