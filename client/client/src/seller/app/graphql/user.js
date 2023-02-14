import { gql } from "@apollo/client";

export const user = {
    SIGN_IN_USER: gql`

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
    ,
    SIGN_UP_USER: gql`
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
    
    `,
    UPDATE_USER: gql`
    mutation($UpdateUserInput:UpdateUserInput){
      updateUser(UserUpdateInput:$UpdateUserInput){
        error
        message
        data{
          name
        }
      }
    }`
}