const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query{
        getAllCategories:AllCategoryOutput
     
        
    }

    type Mutation{
        addNewCategory(CategoryInput:NewCategoryInput):CategoryOutput
    }

    type AllCategoryOutput{
        error:Boolean
        message:String
        data:[CategoryData]
    }

    type CategoryOutput{
        error:Boolean
        message:String
        data:CategoryData
    }

    type CategoryData{
        _id:ID
        name:String
        category_type:String
        image:String
        parent_category:ID
        totalProducts:Int
        created:String
        updated:String
    }

    input NewCategoryInput {
        name:String
        category_type:String
        image:String
        parent_category:ID
        totalProducts:Int
    }

`

module.exports = typeDefs;