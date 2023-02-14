
import { gql } from "@apollo/client";

export const GET_USERS = gql`

query{
    getAllUsers{
      error
      message
      data{
        _id
        name
        email
        user_type
      }
    }
  }

`

export const GET_USER_BY_ID = gql`
query{
  getUserByID{
    error
    message
    data{
      
      _id
      name 
      email
      user_type
    }
  }
}

`
///////////////Shops/////////////////

export const GET_SHOPS_BY_OWNER = gql`
query($_id:ID){
  getShopsByOwner(_id:$_id){
    error
    message
    data{
      _id
      name
      description
      default_discount
      address
    	owner{
        _id
        name
      }
      ratings
      created
      
      
    }
  }
}
`

export const GET_SHOP_BY_ID = gql`
query($_id:ID){
  getShopByID(_id:$_id){
    error
    message
    data{
      _id
      name
      description
      default_discount
      address
      owner{
        _id 
        name
      }
      ratings
      created
    }
  }
}
`