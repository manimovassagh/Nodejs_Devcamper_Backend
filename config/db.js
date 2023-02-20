const {connect: connectInitializer} = require('mongoose')
const mongoose=require('mongoose')
const connectDb =  () => {
    mongoose.set('strictQuery', false);
    connectInitializer(process.env.MONGO_URI).then(()=>{
        console.log(`Successfully connected to MongoDB `.cyan.bold)
    }).catch((error)=>{
        console.log('Error in connecting to DB', error)
    })


}

module.exports = connectDb;