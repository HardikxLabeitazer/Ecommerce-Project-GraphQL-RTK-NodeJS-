const ShopCtrl = require('../../controllers/shop/shop.controller');
const ProductCtrl = require('../../controllers/product/product.controller');
const CategoryCtrl = require('../../controllers/categories/categories.controller');


const resolvers = {
    Query: {
        
        getAllCategories:CategoryCtrl.getAllCategories
        
        
    },
    Mutation: {
        addNewCategory:CategoryCtrl.addNewCategory

    }
}


module.exports = resolvers