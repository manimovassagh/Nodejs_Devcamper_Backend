const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
//init dotenv
dotenv.config({ path: "./config/config.env" });

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

//init the express app
const app = express();

app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//connect to MongoDB
connectDB().catch((error) => {
  console.log(`Error in connecting to DB : ${error}`.red);
});

//body parser
// parse application/json
app.use(bodyParser.json());
//apply middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
//errorHandle middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`.brightYellow);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
