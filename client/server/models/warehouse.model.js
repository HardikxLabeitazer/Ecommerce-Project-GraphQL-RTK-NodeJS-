const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
    location:{
        lat:{
            type:String
        },
        long:{
            type:String
        }
    },
    no_of_employees:{
        type:Number
    },
    capacity:{
        type:Number
    },
    address:{
        type:String,
        trim:true
    },
    shop:{
        type:mongoose.Schema.ObjectId,
        ref:'Shop'
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    warehouse_timings:{
        from:{
            type:String
        },
        to:{
            type:String
        }
    },
    status:{
        type:String
    },
    active:{
        type:Boolean
    },
    
})

module.exports = moongose.model('Warehouse',WarehouseSchema);