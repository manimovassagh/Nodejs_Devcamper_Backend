const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
//Route files
const bootcamps = require('./routes/bootcamps')

//init dotenv
dotenv.config({path: "./config/config.env"});


//connect to MongoDB
connectDB()

//init the express app
const app = express();

//apply middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);


const PORT = process.env.PORT || 4000;
const server = app.listen(4000, () => {
    console.log(`Server is up and running on port ${PORT}`.brightMagenta)
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`.red)
    server.close(() => {
        process.exit(1);
    })
})