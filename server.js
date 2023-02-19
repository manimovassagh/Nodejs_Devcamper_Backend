const express = require("express");
const dotenv = require("dotenv");

//Route files
const bootcamps = require('./routes/bootcamps')
//init dotenv
dotenv.config({path: "./config/config.env"});
//init the express app
const app = express();

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);


const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Server is up and running on port ${PORT}`)
});
