const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating schema
const studentSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    occupation :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    pwd :{
        type : String,
        required : true
    }
})

const Student  = mongoose.model("Student",studentSchema);

module.exports= Student;
