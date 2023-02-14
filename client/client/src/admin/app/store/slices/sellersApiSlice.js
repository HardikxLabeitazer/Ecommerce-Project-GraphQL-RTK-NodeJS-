import apiSlice from "../../../api/apiSlice";


export const sellersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSellers: builder.query({
            query: ({_id}) => ({
                url: `api/${_id}/sellers`,
                method: 'GET',
            })
        })
    })
})


export const {useGetAllSellersQuery} = sellersApiSlice;





