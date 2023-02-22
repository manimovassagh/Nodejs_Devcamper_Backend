const fs = require('fs')

const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv')

dotenv.config({ path: "./config/config.env" });


const bootcamp = require('./models/Bootcamp')
const {connect: connectInitializer} = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Read Json File
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

//import Data
const importData = async () => {
    try {
        await bootcamp.create(bootcamps)
        console.log('Data imported ...'.brightGreen.inverse)
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

//Delete Data

const deleteData = async () => {
    try {
        await bootcamp.deleteMany()
        console.log('Data destroyed ...'.brightRed.inverse)
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    importData().catch((error) => {
        console.log(error)
    });
} else if (process.argv[2] === '-d') {
    deleteData().catch((error) => {
        console.log(error)
    });
}

