const User = require('../../models/user.model');
const extend = require('lodash/extend');
const errorHandler = require('../../helpers/errorHandler');

const addNewUser = async (root, args, context) => {


    const user = new User(args.UserInput);



    try {
        let isfound = await User.findOne({ email: user.email });
        if (isfound) {
            return {
                error: true,
                message: "User Already exists"
            }
        }
        await user.save();
        return {
            error: false,
            message: "User Created Successfully",
            data: user
        }
    } catch (err) {
        return {
            error: true,
            message: errorHandler.getErrorMessage(err),

        }
    }
}

const getAllUsers = async (req, res) => {
    try {

        let users = await User.find().select('_id name email updated created user_type');
        // console.log(users)
        return {
            error: false,
            message: "User retrieved Successfully",
            data: users
        }


    } catch (err) {
        return {
            error: true,
            message: errorHandler.getErrorMessage(err)
        }
    }
}

const getUserByID = async (_, args, context) => {
    if (!context.user_id && !context.type) {
        return {
            error: true,
            message: "Login is required"
        }
    }
    try {

       

        let user = await User.findById(context.user_id).select('_id name email user_type')
        if (!user) {
            return {
                error: true,
                message: "No User Found"
            }
        }

        user.hashed_password = undefined;
        user.salt = undefined;
        return {
            error: false,
            message: "User Successfully Retrieved",
            data: user
        }
    } catch (err) {
        return {
            error: true,
            message: "Could not retrieve User"
        }
    }
}

const read = async (req, res) => {


    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json({
        error: false,
        message: 'Data retrieving Successful',
        data: req.profile
    });
}

const updateUser = async (_,args,context) => {

    if(!context.user_id && !context.type){
        return {
            error:true,
            message:'Login is required'
        }
    }

    try {
        if(context.user_id !== args.UserUpdateInput._id){
            return {
                error:true,
                message:'User not authorized'
            }
        }
    
        // let user = args.UserUpdateInput._id;
        // user = extend(user, args.UserUpdateInput);
        // user.updated = Date.now();
        // await user.save();
        let user = await User.findById(args.UserUpdateInput._id);
        delete args.UserUpdateInput._id;
        user = extend(user,args.UserUpdateInput)
        
        user.updated = Date.now();
        // let user = await User.findByIdAndUpdate({_id:args.UserUpdateInput._id},args.UserUpdateInput,{new:true});
        await user.save();
        
        
        return {
            error: false,
            message: 'User updated Successfully',
            data: user
        }

    } catch (err) {
        return {
            error: true,
            message: errorHandler.getErrorMessage(err)
        }
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        return res.json({
            error: false,
            message: 'Delete Successfully',
            data: deletedUser
        });

    } catch (err) {
        res.status(400).json({
            error: true,
            message: errorHandler.getErrorMessage(err)
        })
    }
}



module.exports = { addNewUser, read, getAllUsers, remove, updateUser, getUserByID }