const express = require('express');
const { connect } = require('mongoose');
const app = express();
const connectDB = require('./database/db');

//database connection
connectDB();

//port define
const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening on port ${port}`));