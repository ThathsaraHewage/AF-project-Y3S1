const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;

const MakePaymentsResearchPaperSchema = new mongoose.Schema({
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
    cardnumber:{
        type: Number,
        required: true,
        trim: true,
    },
    holdersname:{
        type:String,
        required: true,
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