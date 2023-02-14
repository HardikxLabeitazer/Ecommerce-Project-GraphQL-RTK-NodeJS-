const {gql} = require('apollo-server-express');


const typeDefs = gql`

     type Query{
            getAllShops:ShopOutputAll
            getShopsByOwner:ShopOutputAll
            getShopByID(_id:ID):ShopOutputOne
     }


    type Mutation {

        addNewShop(ShopInput:NewShopInput):ShopOutput
        UpdateShopByID(ShopInput:UpdateShopInput):ShopOutputOne
        deleteShopByID(_id:ID):ShopOutputOne
    }

    type ShopOutputOne{
        error:Boolean
        message:String
        data:ShopOutputData
    }

    type ShopOutputAll{
        error:Boolean
        message:String
        data:[ShopOutputData]
    }
    
    type ShopOutput{
        error:Boolean
        message:String
        data:ShopOutputData
    }

    
    type ShopOutputData{
        _id:ID
        name:String
        description:String
        address:String
        owner:UserData
        default_discount:String
        ratings:String
        created:String
        updated:String
        shop_category:String
    }

    input NewShopInput{
        name:String
        description:String
        address:String
        owner:ID
        shop_category:String

    }

    input UpdateShopInput{
        _id:ID
        name:String
        description:String
        address:String
        default_discount:String
        ratings:String
        shop_category:String
    }

`

module.exports  = typeDefs;