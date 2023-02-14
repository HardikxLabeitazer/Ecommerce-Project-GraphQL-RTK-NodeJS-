const ShopCtrl = require('../../controllers/shop/shop.controller');




const resolvers = {
    Query: {
        
        getAllShops:ShopCtrl.getAllShops,
        getShopsByOwner:ShopCtrl.getShopsByOwner,
        getShopByID:ShopCtrl.getShopByID
    
    },
    Mutation: {
        addNewShop:ShopCtrl.addNewShop,
        UpdateShopByID:ShopCtrl.UpdateShopByID,
        deleteShopByID:ShopCtrl.deleteShopByID
    }
}


module.exports = resolvers