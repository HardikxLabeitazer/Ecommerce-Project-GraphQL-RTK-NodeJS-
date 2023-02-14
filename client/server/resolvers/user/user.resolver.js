const UserCtrl = require('../../controllers/user/user.controller');




const resolvers = {
    Query: {
        getAllUsers: UserCtrl.getAllUsers,
        getUserByID:UserCtrl.getUserByID
    
    },
    Mutation: {
        addNewUser: UserCtrl.addNewUser,
        updateUser:UserCtrl.updateUser
    }
}


module.exports = resolvers