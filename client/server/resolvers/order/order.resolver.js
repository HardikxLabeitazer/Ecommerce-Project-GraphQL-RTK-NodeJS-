const ShopCtrl = require('../../controllers/shop/shop.controller');
const ProductCtrl = require('../../controllers/product/product.controller');
const OrderCtrl = require('../../controllers/order/order.controller');



const resolvers = {
    Query: {
        
        getOrderByUserID:OrderCtrl.getOrderByUserID,
        getOrdersBySeller:OrderCtrl.getOrdersBySeller

        
    },
    Mutation: {
        addNewOrder:OrderCtrl.addNewOrder,
        updateOrder:OrderCtrl.updateOrder,
        updateCancelOrder:OrderCtrl.updateCancelOrder,
        updateCancelOrderByUser:OrderCtrl.updateCancelOrderByUser

    }
}


module.exports = resolvers