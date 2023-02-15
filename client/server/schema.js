const {mergeTypeDefs} = require('graphql-tools-merge-typedefs');
const {mergeResolvers} = require('@graphql-tools/merge');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const userType = require('./types/user/user.schema');
const authType = require('./types/auth/auth.schema.js');
const shopType = require('./types/shop/shop.schema.js');
const productType = require('./types/product/product.schema.js');
const orderType = require('./types/order/order.schema');
const fileType = require('./types/files/files.schema');
const categoriesType= require('./types/categories/categories.schema');
const cartType = require('./types/cart/cart.schema');





const userResolver = require('./resolvers/user/user.resolver');
const authResolver = require('./resolvers/auth/auth.resolver');
const shopResolver = require('./resolvers/shop/shop.resolver');
const productResolver = require('./resolvers/product/product.resolver');
const orderResolver = require('./resolvers/order/order.resolver');
const fileResolver = require('./resolvers/files/files.resolver');
const categoriesResolver = require('./resolvers/categories/categories.resolver');
const cartResolver = require('./resolvers/cart/cart.resolver');

const type=[
    userType,
    authType,
    shopType,
    productType,
    orderType,
    fileType,
    categoriesType,
    cartType
]


const allResolvers = [
    userResolver,
    authResolver,
    shopResolver,
    productResolver,
    orderResolver,
    fileResolver,
    categoriesResolver,
    cartResolver
]


const typeDefs = mergeTypeDefs(type);
const resolvers = mergeResolvers(allResolvers);


const executables= makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolvers
});

module.exports = executables;