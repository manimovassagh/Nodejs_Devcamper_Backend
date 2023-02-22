const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const errorHandler=require('./middleware/error')

//init dotenv
dotenv.config({ path: "./config/config.env" });

//Route files
const bootcamps = require("./routes/bootcamps");



//init the express app
const app = express();

//connect to MongoDB
connectDB();

//body parser
// parse application/json
app.use(bodyParser.json());

//apply middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//errorHandle middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(4000, () => {
  console.log(`Server is up and running on port ${PORT}`.brightYellow);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
