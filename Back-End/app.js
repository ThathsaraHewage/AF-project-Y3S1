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
const workshopRoutes = require("./routes/workshopRoutes");
const researchPaperRoutes = require("./routes/researchPaperRoutes");
const researchPaperPaymentsRoutes = require("./routes/ResearchPaperPaymentRoutes");
// const conferenceRoutes = require("./routes/ConferenceRoutes");


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`DB Connected successfully !`)
});


//Middelware
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

//Myroutes
app.use("/api", authRoutes );
app.use("/api", userRoutes );
app.use("/api", workshopRoutes );
app.use("/api", researchPaperRoutes );
app.use("/api",researchPaperPaymentsRoutes);
// app.use("/api", conferenceRoutes );

//Port
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
    console.log(`Server is running on ${port}...`);
});