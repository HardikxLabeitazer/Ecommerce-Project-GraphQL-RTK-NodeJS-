const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query{
       getAllCarts:MultipleCartOutput
       getCartByUser:SingleCartOutput
       getCartByID(cart_id:ID):SingleCartOutput
        
    }

    type Mutation{
       addNewCart:SingleCartOutput
       updateCartByUser(cart_id:ID,product:ID,quantity:Int):SingleCartOutput
       deleteCartByID(cart_id:ID):SingleCartOutput
    }

    type SingleCartOutput {
        error:Boolean
        message:String
        data:CartData
    }

    type MultipleCartOutput {
        error:Boolean
        message:String
        data:[CartData]
    }

    type CartData {
        _id:ID
        total_amount:Float
        total_discount:Float
        total_items:Int
        total_quantity:Int
        delivery_fee:Int
        products:[CartProductsData]
        user:UserData
    }
   
    type CartProductsData {
        product:ProductData
        quantity:Int
    }
   


`

module.exports = typeDefs;