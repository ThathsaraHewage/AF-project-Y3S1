const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    date:{
        type: String,
        trim: true
    },
    short:{
        type: String
    },
    full:{
        type: String
    }
},{timestamps: true});


module.exports = mongoose.model("News", newsSchema);
