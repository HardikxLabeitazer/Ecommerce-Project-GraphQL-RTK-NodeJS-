import { gql } from "@apollo/client"
export const shops={
    GET_SHOPS_BY_OWNER:gql`
    query{
      getShopsByOwner{
        error
        message
        data{
          _id
          name
          description
          default_discount
          shop_category
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
    `,
    GET_SHOP_BY_ID:gql`
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
          shop_category
          owner{
            _id 
            name
          }
          ratings
          created
        }
      }
    }
    `,
    ADD_NEW_SHOP:gql`
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
          shop_category
          owner{
            _id
            name
          }
          
        }
      }
    }
    `,
    UPDATE_SHOP_BY_ID:gql`
    mutation($UpdateShopInput:UpdateShopInput){
      UpdateShopByID(ShopInput:$UpdateShopInput){
        error
        message
        data{
          _id
          name
          description
          default_discount
          address
          created
          updated
          ratings
          shop_category
          owner{
            _id
            name
          }
        }
      }
    }
    `,
    DELETE_SHOP_BY_ID:gql`
    mutation($_id:ID){
      deleteShopByID(_id:$_id){
        error
        message
        data{
          _id
          name
          description
          default_discount
          created
          updated
          ratings
          
        }
      }
    }
    
    `

}