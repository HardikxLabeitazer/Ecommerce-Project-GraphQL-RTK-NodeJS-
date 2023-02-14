
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://hardik:9394733914@practice1.tzkqelo.mongodb.net/Ecommerce?retryWrites=true&w=majority";

const connectToMongo = ()=>{

    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongo successfully")
    })
}

module.exports = connectToMongo;