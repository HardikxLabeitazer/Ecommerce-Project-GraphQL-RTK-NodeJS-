import { gql } from "@apollo/client";

export const categories = {
    GET_ALL_CATEGORIES: gql`
    query{
        getAllCategories{
                error
                message
                data{
                _id
                name
                created
                updated
                category_type
                parent_category
                totalProducts
                image
                    }
                }
        }
    `
}