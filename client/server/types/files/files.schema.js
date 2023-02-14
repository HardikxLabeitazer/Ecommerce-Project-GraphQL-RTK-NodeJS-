const { gql } = require('apollo-server-express');
const Upload = require('graphql-upload/Upload.js')

const typeDefs = gql`

    scalar Upload 
    type File {
        url:String!
    }

    type Query {
        getFile: String
    }

    type Mutation {
        uploadFile(file: Upload!): File!
    }
    



`

module.exports = typeDefs;


// type File {
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }