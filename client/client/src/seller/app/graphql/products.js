import {gql} from '@apollo/client';

export const products={
    GET_PRODUCT_BY_ID: gql`
    query($_id:ID){
      getProductByID(_id:$_id){
        error
        message
        data{
                  _id
              category
              weight
              name
              images
              description
              discount
              Unit
              quantity
              mrp
              sellingprice
              features
              offers
              review{
                userID
                rating
                title
                description
              }
              owner{
                _id
                name
              }
              shop{
                _id
                name
              }
              active
              manufacture
              model
              sku
              brand
              yearofrelease
              warranty
              color
              countryoforigin

        }
      }
    }`,ADD_NEW_PRODUCT: gql`
    mutation($NewProductInput:NewProductInput){
        addNewProduct(NewProduct:$NewProductInput){
          error
          message
          data{
            _id
            name
            description
            discount
            Unit
            images
            quantity
            mrp
            sellingprice
            features
            offers
            owner{
              _id 
              name
            }
            shop{
              _id 
              name
            }
            manufacture
            model
            sku
            brand
              yearofrelease
              warranty
              color
              countryoforigin  
            
          }
        }
      }
    `
  ,
  GET_ALL_PRODUCTS_BY_SHOP: gql`
    query($_id:ID){
      getAllProductsByShop(_id:$_id){
        error
        message
        data{
           _id
          name
          description
          discount
          Unit
          images
          active
          quantity
          mrp
          sellingprice
          features
          offers
          review{
            rating
            title
            description
            userID
          }
          owner{
            _id 
            name
          }
          shop{
            _id 
            name
          }
          manufacture
          model
          sku
          category
          weight
          brand
          yearofrelease
           warranty
          color
          countryoforigin
        }
      }
    }
    `,
  UPDATE_PRODUCT_BY_ID: gql`
    
mutation($UpdateProductInput:UpdateProductInput){
  updateProductByID(productInput:$UpdateProductInput){
    error
    message
    data{
       _id
      name
      description
      discount
      images
      Unit
      quantity
      mrp
      sellingprice
      features
      offers
      owner{
        _id
        name
      }
      shop{
        _id
        name
      }
      manufacture
      model
      sku
      category
      weight
      brand
      yearofrelease
      warranty
       color
      countryoforigin
    }
  }
}
    `,
  DELETE_PRODUCT_BY_ID: gql`
    mutation($_id:ID){
      deleteProductByID(_id:$_id){
        error
        message
        data{
           _id
          category
          weight
          name
          images
          description
          discount
          Unit
          quantity
          mrp
          sellingprice
          features
          offers
          owner{
            _id
            name
          }
          shop{
            _id
            name
          }
          manufacture
          model
          sku
          brand
          yearofrelease
          warranty
          color
          countryoforigin
        }
      }
    }
    `,
  GET_CATEGORIES: gql`
    query{
      getCategories{
        error
        message
        data
      }
    }
    `,
  UPDATE_PRODUCT_STATUS: gql`
    mutation($_id:ID,$active:Boolean){
      updateProductStatus(_id:$_id,active:$active){
        error
        message
        data{
          _id
          category
          weight
          active
          images
          name
          description
          discount
          Unit
          quantity
          mrp
          sellingprice
          features
          offers
          owner{
            _id
            name
          }
          shop{
            _id
            name
          }
          manufacture
          model
          sku
          brand
          yearofrelease
          warranty
          color
          countryoforigin
        }
      }
    }
    `
}