const { connect: connectInitializer } = require("mongoose");
const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const conn = await connectInitializer(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.brightBlue);
};

module.exports = connectDB;
