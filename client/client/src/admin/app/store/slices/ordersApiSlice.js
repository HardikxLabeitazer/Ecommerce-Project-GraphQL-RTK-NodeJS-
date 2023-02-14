import apiSlice from "../../../api/apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: ({_id}) => ({
                url: `api/${_id}/orders`,
                method: 'GET',
            })
        })
    })
})



export const {useGetAllOrdersQuery} = ordersApiSlice;
