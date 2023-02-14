import apiSlice from "../../../api/apiSlice";


export const shopsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllShops: builder.query({
            query: ({_id}) => ({
                url: `api/${_id}/shops`,
                method: 'GET',
            })
        })
    })
})


export const {useGetAllShopsQuery}= shopsApiSlice;



