const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");


const addNewCart = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        
        let cartDetails = new Cart({user:context.user_id});

        let result = await cartDetails.save();

        return {
            error:false,
            message:'Cart Successfully Created',
            data:result
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not create cart for some unknown reason'
        }
    }
}

const getAllCarts = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        
        let cartDetails = await Cart.find().populate({path:'products.product'});

        if(!cartDetails?.length>0){
            return {
                error:true,
                message:"No Carts Found"
            }
        }
        

        return {
            error:false,
            message:'Cart Found',
            data:cartDetails
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not fetch cart details for some unknown reason'
        }
    }
}

const getCartByUser = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        console.log(context)
        let cartDetails = await Cart.findOne({user:context.user_id}).populate({path:'products.product'});

        if(!cartDetails){
            return {
                error:true,
                message:"No Cart Found"
            }
        }
        

        return {
            error:false,
            message:'Cart Found',
            data:cartDetails
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not fetch cart details for some unknown reason'
        }
    }
}


const getCartByID = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        
        let cartDetails = await Cart.findById({_id:args.cart_id}).populate({path:'products.product'})

        if(!cartDetails){
            return {
                error:true,
                message:"No Cart Found"
            }
        }
        

        return {
            error:false,
            message:'Cart Found',
            data:cartDetails
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not fetch cart details for some unknown reason'
        }
    }
}

const updateCartByUser = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        
        let cartDetails = await Cart.findById({_id:args.cart_id});
        let productDetails = await Product.findById({_id:args.product});

        let isExists = cartDetails?.products?.find((item)=>{
            return item.product == args.product
        });

        if(isExists){
            if(args.quantity !== 0){

                let updatedDetails = await Cart.findOneAndUpdate({_id:args.cart_id,'products.product':args.product},{
                    $set:{
                        'products.$.quantity':args.quantity
                    },
                    total_quantity:cartDetails.total_quantity - isExists.quantity + args.quantity,
                    total_amount:cartDetails.total_amount  - (isExists.quantity * productDetails.sellingprice) + (args.quantity * productDetails.sellingprice),
                    total_discount:cartDetails.total_discount - (isExists.quantity*productDetails.mrp - isExists.quantity * productDetails.sellingprice) + (args.quantity * productDetails.mrp - args.quantity * productDetails.sellingprice),
                    total_items:cartDetails.products.length
                },{new:true}).populate({path:'products.product'})

                return {
                    error:false,
                    message:'Cart Updated Successfully',
                    data:updatedDetails
                }

            }else if(args.quantity ==0 && (cartDetails.total_quantity - isExists.quantity !==0)){
                let updatedDetails = await Cart.findByIdAndUpdate({_id:args.cart_id},{
                    $pull:{
                        products:{
                            product:args.product
                        }
                    },
                    total_quantity:cartDetails.total_quantity - isExists.quantity + args.quantity,
                    total_amount:cartDetails.total_amount  - (isExists.quantity * productDetails.sellingprice) + (args.quantity * productDetails.sellingprice),
                    total_discount:cartDetails.total_discount - (isExists.quantity*productDetails.mrp - isExists.quantity * productDetails.sellingprice) + (args.quantity * productDetails.mrp - args.quantity * productDetails.sellingprice),
                    total_items:cartDetails.products.length - 1
                },{new:true})

                return {
                    error:false,
                    message:'Cart Updated Successfully',
                    data:updatedDetails
                }

            }else if(args.quantity==0 && (cartDetails.total_quantity - isExists.quantity==0)){

                let updatedDetails = await Cart.findByIdAndDelete({_id:args.cart_id},{new:true});

                return {
                    error:false,
                    message:'Cart Deleted Successfully',
                    data:updatedDetails
                }

            }
        }

        let updatedDetails = await Cart.findByIdAndUpdate({_id:args.cart_id},{
            $push:{
                products:{
                    product:args.product,
                    quantity:args.quantity
                }
            },
            total_quantity:cartDetails.total_quantity + args.quantity,
            total_amount:cartDetails.total_amount  + (args.quantity * productDetails.sellingprice),
            total_discount:cartDetails.total_discount + (args.quantity * productDetails.mrp - args.quantity * productDetails.sellingprice),
            total_items:cartDetails.products.length +1
        },{new:true})
       
        return {
            error:false,
            message:'Cart Updated Successfully',
            data:updatedDetails
        }

    } catch (error) {
        console.log(error)
        return {
            error:true,
            message:'Could not update cart details for some unknown reason'
        }
    }
}


const deleteCartByID = async (_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login Required'
        }
    }
    try {
        
        let cartDetails = await Cart.findByIdAndDelete({_id:args.cart_id},{new:true}).populate({path:'products.product'})

     

        return {
            error:false,
            message:'Cart Deleted',
            data:cartDetails
        }

    } catch (error) {
        return {
            error:true,
            message:'Could not delete cart for some unknown reason'
        }
    }
}

module.exports = {
    addNewCart,
    getAllCarts,
    getCartByUser,
    getCartByID,
    updateCartByUser,
    deleteCartByID
}