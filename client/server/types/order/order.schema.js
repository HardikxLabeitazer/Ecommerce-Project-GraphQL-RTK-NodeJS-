const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query{
        getOrderByUserID:AllOrderOutput
        getOrdersBySeller(shop_id:ID):AllOrderOutput
        
    }

    type Mutation{
        addNewOrder(OrderInput:NewOrderInput):OrderOutput
        updateOrder(cartItemID:ID,status:String):OrderOutput
        updateCancelOrder(orderID:ID,status:String,cartID:ID,quantity:Int,product_id:ID):OrderOutput
        updateCancelOrderByUser(cardID:ID):OrderOutput
    }

    type AllOrderOutput{
        error:Boolean
        message:String
        data:[OrderData]
    }

    type OrderOutput{
        error:Boolean
        message:String
        data:OrderData
    }

    type OrderData{
        _id:ID
        customer_name:String
        customer_email:String
        phone:String
        ordered_by:ID
        transaction_ID:String
        delivery_fee:Int
        packaging_charge:Int
        total:Int
        products:cartData
        delivery_address:deliveryAddressDataOutput
    }

    type cartData{
        product:[ProductData]
        quantity:Int
        shop:ShopOutputData
        status:String
        _id:ID
    }

    type deliveryAddressDataOutput{
        street:String
        city:String
        state:String
        zipcode:String
        country:String
    }

    input NewOrderInput{
        customer_name:String
        customer_email:String
        phone:String
        ordered_by:ID
        transaction_ID:String
        delivery_fee:Int
        packaging_charge:Int
        total:Int
        products:[cartInput]
        delivery_address:deliveryAddressData
    }

    input cartInput{
        product:ID
        quantity:Int
        shop:ID
    }
    input deliveryAddressData{
        street:String
        city:String
        state:String
        zipcode:String
        country:String
    }
    

   


`

module.exports = typeDefs;