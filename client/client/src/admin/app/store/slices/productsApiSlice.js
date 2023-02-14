import apiSlice from "../../../api/apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: ({_id}) => ({
                url: `api/${_id}/products`,
                method: 'GET',
            })
        })
    })
})



export const { useGetAllProductsQuery } = productApiSlice;