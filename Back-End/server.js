/*
*
* N.I.T.Hewage
* CRUD operations with nodejs,express using mongodb cloud database
*
* */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongo db connection is success !");
});


const studentRouter =  require("./routes/students.js");

app.use("/student",studentRouter);


app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');
})

