const Order  = require('../../models/order.model');
const Product = require('../../models/product.model')

const addNewOrder = async(_,args,context)=>{
    if(!context.user_id && context.type !=='user'){
        return {
            error:true,
            message:'User Login is required'
        }
    }
    try {
        
        let products = args.OrderInput.products;
        let bulkUpdate = products.map((item)=>{
            return {
                "updateOne":{
                    "filter":{
                        "_id":item.product
                    },
                    "update":{
                        "$inc":{
                            "quantity":-item.quantity
                        }
                    }
                }
            }
        })
        

        let result = await Product.bulkWrite(bulkUpdate,{});
        
        

        let order  = new Order(args.OrderInput);
        let resultFinal = await order.save();

        return {
            error:false,
            message:'Order Placed Successfully',
            data:resultFinal
        }



    } catch (error) {
    console.log(error)
        return {
            error:true,
            message:'Could not create an order'
        }
    }
}

const getOrderByUserID=async(_,args,context)=>{
    if(!context.user_id && !context.type){
        return {
            error:true,
            message:'Login is required'
        }
    }
    try {
        
        let orders = await Order.find({ordered_by:context.user_id}).populate({path:"products.product",select:'_id name mrp images'})
        if(orders.length==0){
            return {
                error:true,
                message:'No orders found'
                
            }
        }

        return {
            error:false,
            message:'Orders found',
            data:orders
        }

    } catch (error) {
        return {
            error:true,
            message:'Unable to retrieve the orders'
        }
    }
}

const getOrdersBySeller = async(_,args,context)=>{
    if(!context.user_id && context.type !== 'seller'){
        return {
            error:true,
            message:'Seller Login required'
        }
    }
    try {
        let orders = await Order.find({'products.shop':args.shop_id})
                        .populate({path:'products.product',select:'_id name mrp'})
                        .sort('-created')
                        .exec()
        if(!orders.length>0){
            return {
                error:true,
                message:'No orders found'
            }
        }

        return {
            error:false,
            message:'Orders found',
            data:orders
        }
        
    } catch (error) {
        return {
            error:true,
            message:'Could not find any orders'
        }
    }
}

const updateOrder = async (_,args,context)=>{
    if(!context.user_id && context.type !== 'seller'){
        return {
            error:true,
            message:'Seller Login required'
        }
    }
    try {
        
        let order = await Order.updateOne({"products._id":args.cartItemID},{"products.$.status":args.status},{new:true});
        // let order = await Order.updateOne({"products.product":args.cartItemID},{"products.$.status":args.status},{new:true});
        
        if(!order){
            return {
                error:true,
                message:'No order updated'
            }
        }
        
        return {
            error:false,
            message:'Order updated successfully',
            data:order
        }
        
    } catch (error) {
        return {
            error:true,
            message:'Could not update the order'
        }
    }
}

const updateCancelOrder = async(_,args,context)=>{
    if(!context.user_id && context.type !== 'seller'){
        return {
            error:true,
            message:'Seller Login required'
        }
    }
    try {

        let isCancelled = await Order.findOne({_id:args.orderID},{"products":{$elemMatch:{"_id":args.cartID}}});
        if(isCancelled.products[0].status=='Cancelled'){
            return {
                error:true,
                message:"Order is already cancelled"
            }
        }
        
       let productIncrease = await Product.findByIdAndUpdate(args.product_id,{$inc:{"quantity":args.quantity}},{new:true})
                    .exec()
        

        if(!productIncrease){
            return {
                error:true,
                message:'Could not update the product details'
            }
        }

        let order = await Order.updateOne({"products._id":args.cartID},{"products.$.status":args.status},{new:true});
        
        if(!order){
            return {
                error:true,
                message:'No order updated'
            }
        }

        return {
            error:false,
            message:'Order updated Successfully'
        }

        
    } catch (error) {
        return {
            error:true,
            message:'Could not cancel the order'
        }
    }
}

const updateCancelOrderByUser = async(_,args,context)=>{
    if(!context.user_id && !context.type =='user'){
        return {
            error:true,
            message:'User Login is required'
        }
    }
    try {
        let order = await Order.updateOne({"products._id":args.cartID},{"products.$.status":'Cancelled'},{new:true});
        if(!order){
            return{
                error:true,
                message:'No order executed'
            }
        }
        return {
            error:false,
            message:'Order Processed for Cancellation',
            data:order
        }
    } catch (error) {
        return {
            error:true,
            message:'Could not cancel the order'
        }
    }
}

module.exports = {
    addNewOrder,
    getOrderByUserID,
    getOrdersBySeller,
    updateOrder,
    updateCancelOrder,
    updateCancelOrderByUser
}