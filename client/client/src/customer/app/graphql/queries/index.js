import { user } from "./users";
import { shops } from "./shops";
import {product} from './product'
import {orders} from './order';
import {files} from './files';
import {categories} from './catergories';
import { cart } from "./cart";


let graphQLQueries={};
const addQuery = query =>{
    Object.keys(query).forEach(key=>{
        graphQLQueries[key]=query[key];
    })
}



addQuery(user);
addQuery(shops);
addQuery(product);
addQuery(orders);
addQuery(files);
addQuery(categories);
addQuery(cart);

export default graphQLQueries