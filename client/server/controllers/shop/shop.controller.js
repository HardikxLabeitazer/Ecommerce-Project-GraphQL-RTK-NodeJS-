const Shop = require('../../models/shop.model');
const User = require('../../models/user.model')

const addNewShop = async(_,args,context)=>{
    if(!context.user_id && context.type !=='seller'){
        return {
            error:true,
            message:'Seller login required'
        }
    }
    try {
        const shop = new Shop(args.ShopInput);
        await shop.save();

        return {
            error:false,
            message:'Shop created Successfully',
            data:shop
        }
        
    } catch (error) {
        return {
            error:true,
            message:'Could not create a shop'
        }
    }
}

const getAllShops = async (_,args,context)=>{
    try {
        let shops = await Shop.find()
                                .populate('owner','_id name')
        return {
            error:false,
            message:'Shops Retrieved Successfully',
            data:shops
        }
        
    } catch (error) {
        return {
            error:true,
            message:'Could not retrieve shops'
        }
    }
}

const getShopsByOwner = async (_,args,context)=>{
    if(!context.user_id){
        return {
            error:true,
            message:'Login required'
        }
    }
    try {

      
        
        if(!context.type=='seller'){
            return {
                error:true,
                message:'User not authorized'
            }
        }
       
        let shops = await Shop.find({owner:context.user_id})
                                .populate('owner','_id name');
        if(shops.length<1){
            return {
                error:true,
                message:'No Shops found'
            }
        }

        return {
            error:false,
            message:'Shops found',
            data:shops
        }
        
    } catch (error) {
        
        return {
            error:true,
            message:'Cannot retrive shops'
        }
    }
}

const getShopByID = async(_,args,context)=>{
    if(!context.user_id){
        return {
            error:true,
            message:'Login required'
        }
    }
    try {
        if(context.type !== 'seller'){
            return {
                error:true,
                message:'User not authorized'
            }
        }
        

        let shopData = await Shop.findById(args._id).populate('owner','_id name').exec()
        if(!shopData){
            return {
                error:true,
                message:'Not shop found'
            }
        }

        return {
            error:false,
            message:'Shop Data Success',
            data:shopData
        }
        
    } catch (error) {
        return {
            error:true,
            message:'Could not retrieve Shop'
        }
    }
}

const UpdateShopByID = async(_,args,context)=>{
    if(!context.user_id &&  !context.type=='seller'){
        return {
            error:true,
            message:"Login required"
        }
    }
    try {
        args.ShopInput.updated = Date.now();
        let shop = await Shop.findByIdAndUpdate({_id:args.ShopInput._id},args.ShopInput,{new:true})
        let result = shop.save();
        return {
            error:false,
            message:'Succesfully updated',
            data:result
        }
        

    } catch (error) {
        return {
            error:true,
            message:'Cannot Update the Shop'
        }
    }
}
const deleteShopByID = async(_,args,context)=>{
    if(!context.user_id && !context.type=='seller'){
        return {
            error:true,
            message:'Seller Login required'
        }
    }
    try {
        
        let deletedShop = await Shop.findByIdAndDelete(args._id);
        if(!deletedShop){
            return {
                error:true,
                message:'Could not delete shop'
            }
        }
        return {
            error:false,
            message:'Shop deleted Successfully',
            data:deletedShop
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not delete the shop'
        }
    }
}

module.exports = {addNewShop,getAllShops,getShopsByOwner,getShopByID,UpdateShopByID,deleteShopByID};