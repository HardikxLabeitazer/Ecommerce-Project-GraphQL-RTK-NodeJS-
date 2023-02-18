import {gql} from '@apollo/client';

export const cart = {
    ADD_NEW_CART:gql`
        mutation{
            addNewCart{
                error
                message
                data{
                _id
                total_items
                total_amount
                total_discount
                total_quantity
                user {
                    _id
                }
                products{
                    product{
                    _id
                    name
                    mrp
                    sellingprice
                    shop {
                        _id
                        name
                    }
                    }
                    quantity
                }
                }
            }
            }
    `,
    UPDATE_CART_BY_USER:gql`
        mutation($cart_id:ID,$product:ID,$quantity:Int){
            updateCartByUser(cart_id:$cart_id,quantity:$quantity,product:$product){
                error
                message
                data{
                _id
                total_items
                total_amount
                total_discount
                total_quantity
                user {
                    _id
                }
                products{
                    product{
                    _id
                    name
                    mrp
                    sellingprice
                    images
                    shop {
                        _id
                        name
                    }
                    }
                    quantity
                }
                }
            }
            }
    `,
    GET_CART_BY_USER:gql`
       query {
            getCartByUser{
                error
                message
                data{
                _id
                total_items
                total_amount
                total_discount
                total_quantity
                user {
                    _id
                }
                products{
                    product{
                    _id
                    name
                    mrp
                    images
                    sellingprice
                    shop {
                        _id
                        name
                    }
                    }
                    quantity
                }
                }
            }
            }
    `,
    GET_CART_BY_ID:gql`
        query($cart_id:ID) {
            getCartByID(cart_id:$cart_id){
                error
                message
                data{
                _id
                total_items
                total_amount
                total_discount
                total_quantity
                user {
                    _id
                }
                products{
                    product{
                    _id
                    name
                    mrp
                    images
                    sellingprice
                    shop {
                        _id
                        name
                    }
                    }
                    quantity
                }
                }
            }
            }
    `
}