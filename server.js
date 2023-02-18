const express = require("express");
const dotenv = require("dotenv");
//init dotenv
dotenv.config({ path: "./config/config.env" });
//init the express app
const app = express();



app.get('/',(req,res)=>{
    res.send('Hi Mani')
})


const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Server is up and running on port ${PORT}`)
});
