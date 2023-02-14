import { gql } from "@apollo/client";

export const orders = {
    GET_ORDERS_BY_SELLER: gql`
    query($shop_id:ID){
      getOrdersBySeller(shop_id:$shop_id){
        error
        message
        data{
          _id
          phone
          customer_name
          customer_email
          products{
            product{
              _id
              name
              mrp
            }
            shop{
              _id
            }
            status
            quantity
            _id
          }
          transaction_ID
          delivery_fee
          packaging_charge
          ordered_by
          delivery_address{
            state
            street
            city
            zipcode
            country
          }
        }
      }
    }
    `,
    UPDATE_ORDER_DEFAULT: gql`
    mutation($cartItemID:ID,$status:String){
      updateOrder(cartItemID:$cartItemID,status:$status){
        error
        message
      }
    }
    `,
    UPDATE_ORDER_CANCEL: gql`
    mutation($product_id:ID,$cartID:ID,$orderID:ID,$status:String,$quantity:Int){
      updateCancelOrder(product_id:$product_id,cartID:$cartID,orderID:$orderID,status:$status,quantity:$quantity){
        error
        message
      }
    }
    
    
    `
}