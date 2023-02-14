const {gql} = require('apollo-server-express');


const typeDefs = gql`

    type Query{

        getAllUsers:AllUserDataOutput
        getUserByID:UserOutput
    }

    type Mutation{

        addNewUser(UserInput:NewUserInput):UserOutput
        updateUser(UserUpdateInput:UpdateUserInput):UserOutput
    }

    type UserOutput{
        error:Boolean
        message:String
        data:UserData
    }

    type AllUserDataOutput{
        error:Boolean,
        message:String,
        data:[UserData]
    }

    type UserData{
        _id:ID
        name:String,
        email:String,
        created:String,
        user_type:String
    }

    input NewUserInput{
        name:String,
        email:String,
        password:String
        user_type:String
    }

    input UpdateUserInput{
        _id:ID
        name:String,
        email:String,
        password:String
    }


`

module.exports = typeDefs;