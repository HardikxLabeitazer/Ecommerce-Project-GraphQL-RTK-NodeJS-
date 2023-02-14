const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    email:{
        type:String,
        trim:true,
        unique:'Email already exists',
        match:[/.+\@.+\..+/,'Please fill a valid email address']
    },
    created:{
        type:Date,
        default:Date.now
    },
   
    updated:Date,
    hashed_password:{
        type:String,
        required:"password is easy"
    },
    salt:String,
    user_type:{
        type:String,
        default:'user'
    },
    mobile:{
        type:String
    },
    recovery_mobile:{
        type:String
    },
    image:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    },
    city:{
        type:String
    },
    address:[{
        type:String,
        trim:true
    }],
    aadhar_card_no:{
        type:String
    },
    pan_card_no:{
        type:String
    },
    upi_ID:[
        {
            type:String
        }
    ],
    location:{
        lat:{
            type:String
        },
        long:{
            type:String
        }
    },
    unique_ID:{
        type:String
    },
    user_ranking:{
        type:String
    },
    total_orders:{
        type:Number
    },
    account_status:{
        type:String,
        default:'Normal'
    },
    

    
  


})

UserSchema
    .virtual('password')
    .set(function(password){
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password)
        })
    .get(function(){
            return this._password
        })

UserSchema.methods={
    authenticate:function (plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },
    encryptPassword:function(password){
        if(!password) return '';
        try{
            return crypto
                    .createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex')
        }catch(err){
            return ''
        }
    },
    makeSalt:function(){
        return Math.round((new Date().valueOf()*Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length <6){
        this.invalidate('password','Password must be at least 6 characters.')
    }
    if(this.isNew && !this._password){
        this.invalidate('password','Password is required')
    }
},null)


module.exports = mongoose.model('User',UserSchema)