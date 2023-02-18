
const mongoose = require('mongoose');
const mongoUri = "mongoURI";

const connectToMongo = ()=>{

    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongo successfully")
    })
}

module.exports = connectToMongo;
