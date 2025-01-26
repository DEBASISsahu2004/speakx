const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch(error){
        console.error("Error while connecting MongoDB", error);
    }
}

module.exports = ConnectDb;