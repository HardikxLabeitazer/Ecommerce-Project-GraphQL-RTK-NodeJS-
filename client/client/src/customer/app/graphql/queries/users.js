import { gql } from "@apollo/client"
export const user = {
    GET_USERS:gql`
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
    `,
    GET_USER_BY_ID:gql`
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
    
    `,
    SIGN_IN_USER:gql`

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
    SIGN_UP_USER:gql`
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
    UPDATE_USER:gql`
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
    
}