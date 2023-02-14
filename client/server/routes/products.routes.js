const ProductCtrl = require('../controllers/admin/products.controller');
const AuthCtrl = require('../controllers/admin/admin.controller');
const AdminAuthCtrl = require('../controllers/auth/adminauth.controller');
const ShopCtrl = require('../controllers/admin/shop.controller');
const UserCtrl = require('../controllers/admin/user.controller')

const Router = require('express').Router();


Router.route('/api/:adminId/products')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,AuthCtrl.getAdminCheck,ProductCtrl.getAllProductsByAdmin)

Router.route('/api/products/:productId')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,ProductCtrl.getProductByID)

Router.route('/api/:adminId/:shopId/products')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,AuthCtrl.getAdminCheck,ProductCtrl.getProductsByShopAdmin);

Router.route('/api/:adminId/user/:userId/products')
    .get(AdminAuthCtrl.requireSignin,ProductCtrl.getProductsByUserAdmin)

Router.param('adminId',AuthCtrl.getAdminByID)
Router.param('productId',ProductCtrl.getProductByID);
Router.param('shopId',ShopCtrl.getShopByIDAdmin)
Router.param('userId',UserCtrl.getUserByIDAdmin)

module.exports = Router;