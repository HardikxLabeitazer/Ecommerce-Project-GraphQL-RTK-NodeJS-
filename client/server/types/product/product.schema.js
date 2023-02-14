const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query{
        getAllShops:ShopOutputAll
        getAllProductsByShop(_id:ID):AllProductsOutput
        getAllProducts:AllProductsOutput
        getProductByID(_id:ID):ProductOutput
        getProductsByPrice(low:Int,high:Int,sort:String):AllProductsOutput
        
    }

    type Mutation{

        addNewProduct(NewProduct:NewProductInput):ProductOutput
        updateProductByID(productInput:UpdateProductInput):ProductOutput
        deleteProductByID(_id:ID):ProductOutput
        updateProductStatus(_id:ID,active:Boolean):ProductOutput
        addProductReviewAndRating(RatingReview:RatingReviewInput):ProductOutput
    }

    type AllProductsOutput{
        error:Boolean
        message:String
        data:[ProductData]
    }

    type ProductOutput{
        error:Boolean
        message:String
        data:ProductData
    }
    type ProductData{
        _id:ID
        name:String
        description:String
        category:String
        quantity:Int
        images:[String]
        mrp:Int
        sellingprice:Int
        shop:ShopOutputData
        owner:UserData
        Unit:String
        discount:String
        countryoforigin:String
        manufacture:String
        model:String
        offers:[String]
        sku:String
        ratings:Int
        weight:String
        status:String
        active:Boolean
        features:[String]
        brand:String
        review:[ReviewOutput]
    }

    input NewProductInput{
        name:String
        description:String
        category:String
        quantity:Int
        images:[String]
        mrp:Int
        sellingprice:Int
        shop:ID
        owner:ID
        Unit:String
        discount:String
        countryoforigin:String
        manufacture:String
        model:String
        offers:[String]
        sku:String
        weight:String
        status:String
        active:Boolean
        features:[String]
        brand:String
    }

    input UpdateProductInput{
        _id:ID
        name:String
        description:String
        category:String
        quantity:Int
        mrp:Int
        images:[String]
        sellingprice:Int
        shop:ID
        owner:ID
        Unit:String
        discount:String
        countryoforigin:String
        manufacture:String
        model:String
        offers:[String]
        sku:String
        weight:String
        status:String
        active:Boolean
        features:[String]
        brand:String
    }

   input RatingReviewInput {
     _id:ID
     ratings:Int
     title:String
     description:String
     userRating:Int
     userID:ID
   }

   type ReviewOutput{
    title:String
    description:String
    rating:Int
    userID:ID
   }

    


`

module.exports = typeDefs;