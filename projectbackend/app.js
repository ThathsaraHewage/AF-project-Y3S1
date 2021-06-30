require('dotenv').config();


const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My route
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
const eventRoutes = require("./routes/event");


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`DB Connected`)
});


//Middelware
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

//Myroutes
app.use("/api", authRoutes );
app.use("/api", userRoutes );
app.use("/api", newsRoutes );
app.use("/api", eventRoutes );


//Port
const port = process.env.PORT || 9900;

//starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}...`);
});