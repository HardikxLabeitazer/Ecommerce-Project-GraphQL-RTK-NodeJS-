const OrderCtrl = require('../controllers/admin/orders.controller');
const AuthCtrl = require('../controllers/admin/admin.controller');
const AdminAuthCtrl = require('../controllers/auth/adminauth.controller');
const ShopCtrl = require('../controllers/admin/shop.controller');
const UserCtrl = require('../controllers/admin/user.controller');

const Router = require('express').Router();


Router.route('/api/:adminId/orders')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,OrderCtrl.getAllOrders);

Router.route('/api/:adminId/shop/:shopId/orders')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,AuthCtrl.getAdminCheck,OrderCtrl.getAllOrderDetailsByShop);

Router.route('/api/:adminId/user/:userId/orders')
    .get(AdminAuthCtrl.requireSignin,OrderCtrl.getAllOrderDetailsByUser);


Router.param('shopId',ShopCtrl.getShopByIDAdmin);
Router.param('adminId',AuthCtrl.getAdminByID);
Router.param('userId',UserCtrl.getUserByIDAdmin);   


module.exports = Router;