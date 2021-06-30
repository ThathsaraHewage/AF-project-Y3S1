const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    date:{
        type: String,
        trim: true,
        required: true
    },
    short:{
        type: String,
        required: true,
        maxlength:100
    },
    full:{
        type: String
    }
},{timestamps: true});


module.exports = mongoose.model("News", newsSchema);
