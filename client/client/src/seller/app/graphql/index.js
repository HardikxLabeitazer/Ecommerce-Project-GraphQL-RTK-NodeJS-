import { user } from "./user";
import {shops} from './shops'
import {products} from './products';
import {orders} from './orders';


let graphQLQueries={};
const addQuery = query =>{
    Object.keys(query).forEach(key=>{
        graphQLQueries[key]=query[key];
    })
}

addQuery(user);
addQuery(shops);
addQuery(products);
addQuery(orders);




export default graphQLQueries