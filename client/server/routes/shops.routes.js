const ProductCtrl = require('../controllers/admin/products.controller');
const AuthCtrl = require('../controllers/admin/admin.controller');
const AdminAuthCtrl = require('../controllers/auth/adminauth.controller');
const ShopCtrl = require('../controllers/admin/shop.controller');
const UserCtrl = require('../controllers/admin/user.controller');

const Router = require('express').Router();


Router.route('/api/:adminId/shops')
    .get(AdminAuthCtrl.requireSignin,ShopCtrl.getAllShopsByAdmin)

Router.route('/api/:adminId/:userId/shops')
    .get(AdminAuthCtrl.requireSignin,ShopCtrl.getAllShopsByOwner)

Router.param('adminId',AuthCtrl.getAdminByID);
Router.param('userId',UserCtrl.getUserByIDAdmin);





module.exports = Router;