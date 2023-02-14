import { gql } from "@apollo/client";

export const SIGN_IN_USER = gql`

mutation($email:String,$password:String){
    signin(email:$email,password:$password){
      error
      message
      token
      data{
        _id
        name
        
      }
    }
  }
`

export const SIGN_UP_USER = gql`
mutation($NewUserInput:NewUserInput){
  addNewUser(UserInput:$NewUserInput){
    error
    message
    data{
      _id
      name
      email
    }
  }
}

`

export const UPDATE_USER = gql`
mutation($UpdateUserInput:UpdateUserInput){
  updateUser(UserUpdateInput:$UpdateUserInput){
    error
    message
    data{
      name
    }
  }
}
`

export const ADD_NEW_SHOP = gql`
mutation($NewShopInput:NewShopInput){
  addNewShop(ShopInput:$NewShopInput){
  	error
    message
    data{
      _id
      name
      description
      default_discount
      ratings
      created
      owner{
        _id
        name
      }
      
    }
  }
}
`