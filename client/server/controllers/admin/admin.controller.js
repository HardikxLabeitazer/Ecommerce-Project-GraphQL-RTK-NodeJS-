const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const addAdmin = async(req,res)=>{
    try {
        if(req.body.user_type!=='admin'){
            return res.json({
                error:true,
                message:'Cannot proceed further'
            })
        }
        const admin = new User(req.body);
        let isfound = await User.findOne({ email: admin.email });
        if (isfound) {
            return res.status(400).json({
                error:true,
                message:'User already exists'
            })
        }
        
        await admin.save();
        let data = admin;
        data.hashed_password = undefined;
        data.salt = undefined;
        return res.json({
            error:false,
            message:'Admin created successfully',
            data
        })
    } catch (error) {
        return res.status(400).json({
            error:true,
            message:'Could not create a admin'
        })
    }
}

const getAllAdmin = async(req,res)=>{
    try {
        let admins = await User.find({user_type:'admin'}).select('name email created user_type')
        if(!admins.length>0){
            return res.status(400).json({
                error:true,
                message:'No admins found'
            })
        }
        

        return res.status(200).json({
            error:false,
            message:"Admin data retrieved",
            data:admins
        })
    } catch (error) {
        return res.status(400).json({
            error:true,
            message:'Could not retrieve admins'
        })
    }
}

const getAdminByID = async(req,res,next,id)=>{
    try {
        let admin = await User.findById(id).select('_id name email created user_type');
        if(!admin){
            return res.status(400).json({
                error:true,
                message:'User not found'
            })
        }

        req.profile = admin;
        next();
    } catch (error) {
        return res.status(400).json({
            error:true,
            message:'Could not retrieve Admin'
        })
    }
}

const getAdminCheck = async(req,res,next)=>{
    if(req.profile.user_type!=='admin'){
        return res.status(401).json({
            error:true,
            message:'User not authorized'
        })
    }
    next();
}

const getAdminDetails = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(
                token,
                config.jwtSecret
                
            );

        let user = await User.findById(decodedToken._id);

        if(!user){
            return res.status(400).json({
                error:true,
                message:'Could not find user'
            })
        }

        if(user.user_type !=='admin'){
            return res.status(401).json({
                error:true,
                message:'User not authorized'
            })
        }

        return res.json({
            error:false,
            message:'User retrieved successfully',
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:'Could not fetch details'
        })
    }
}

module.exports = {
    addAdmin,
    getAllAdmin,
    getAdminByID,
    getAdminCheck,
    getAdminDetails
}