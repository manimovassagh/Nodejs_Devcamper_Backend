const express = require("express");
const dotenv = require("dotenv");
//init dotenv
dotenv.config({ path: "./config/config.env" });
//init the express app
const app = express();

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log("app is working"));
