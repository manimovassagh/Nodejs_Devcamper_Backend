const fs = require("fs");

const { connect, set } = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const bootcamp = require("./models/Bootcamp");
const course = require("./models/Course");
const { connect: connectInitializer } = require("mongoose");

set("strictQuery", false);
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Read Json File
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//import Data
const importData = async () => {
  try {
    await bootcamp.create(bootcamps);
    //await course.create(courses);
    console.log("Data imported ...".brightGreen.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete Data

const deleteData = async () => {
  try {
    await bootcamp.deleteMany();
    await course.deleteMany();
    console.log("Data destroyed ...".brightRed.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData().catch((error) => {
    console.log(error);
  });
} else if (process.argv[2] === "-d") {
  deleteData().catch((error) => {
    console.log(error);
  });
}
