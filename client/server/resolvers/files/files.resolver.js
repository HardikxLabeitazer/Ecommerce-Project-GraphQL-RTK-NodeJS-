
const OrderCtrl = require('../../controllers/order/order.controller');
const FileCtrl = require('../../controllers/files/files.controller');




const resolvers = {
    Query: {
        
        getFile:FileCtrl.getFile
    },
    Mutation: {
        uploadFile:FileCtrl.uploadFile
       
    }
}


module.exports = resolvers