const ShopCtrl = require('../../controllers/shop/shop.controller');
const ProductCtrl = require('../../controllers/product/product.controller');



const resolvers = {
    Query: {
        
        getAllShops:ShopCtrl.getAllShops,
        getAllProductsByShop:ProductCtrl.getAllProductsByShop,
        getAllProducts:ProductCtrl.getAllProducts,
        getProductByID:ProductCtrl.getProductByID,
        getProductsByPrice:ProductCtrl.getProductsByPrice
        
    },
    Mutation: {
        addNewProduct:ProductCtrl.addNewProduct,
        updateProductByID:ProductCtrl.updateProductByID,
        deleteProductByID:ProductCtrl.deleteProductByID,
        updateProductStatus:ProductCtrl.updateProductStatus,
        addProductReviewAndRating:ProductCtrl.addProductReviewAndRating

    }
}


module.exports = resolvers