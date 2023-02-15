const CartCtrl = require('../../controllers/cart/cart.controller')



const resolvers = {
    Query: {
        
       getAllCarts:CartCtrl.getAllCarts,
       getCartByUser:CartCtrl.getCartByUser,
       getCartByID:CartCtrl.getCartByID

        
    },
    Mutation: {
       addNewCart:CartCtrl.addNewCart,
       updateCartByUser:CartCtrl.updateCartByUser,
       deleteCartByID:CartCtrl.deleteCartByID

    }
}


module.exports = resolvers