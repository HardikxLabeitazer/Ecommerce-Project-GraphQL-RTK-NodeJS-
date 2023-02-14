const AuthCtrl = require('../controllers/admin/admin.controller')
const AdminAuthCtrl = require('../controllers/auth/adminauth.controller');
const UserCtrl = require('../controllers/admin/user.controller')

const Router = require('express').Router();

Router.route('/api/signup')
    .post(AuthCtrl.addAdmin);

Router.route('/api/login')
    .post(AdminAuthCtrl.signin)

Router.route('/api/alladmin')
    .get(AdminAuthCtrl.requireSignin,AuthCtrl.getAllAdmin)

Router.route('/api/:adminId/users')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,AuthCtrl.getAdminCheck,UserCtrl.getAllUsers);

Router.route('/api/:adminId/sellers')
    .get(AdminAuthCtrl.requireSignin,AdminAuthCtrl.hasAuthorization,AuthCtrl.getAdminCheck,UserCtrl.getAllSellers);
    
Router.route('/api/admindetails')
    .get(AdminAuthCtrl.requireSignin,AuthCtrl.getAdminDetails);
    
Router.param('adminId',AuthCtrl.getAdminByID);

module.exports = Router;