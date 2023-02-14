import apiSlice from "../../../api/apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: ({_id}) => ({
                url: `api/${_id}/users`,
                method: 'GET',
            })
        }),
        loginUser:builder.mutation({
            query:({email,password})=>({
                url:'api/login',
                method:'POST',
                body:{
                    email,
                    password
                }
            })
        }),
        getAdminDetails:builder.query({
            query:()=>({
                url:'api/admindetails',
                method:'GET'
            })
        })
    })
})


export const {
    useGetAllUsersQuery,
    useLoginUserMutation,
    useGetAdminDetailsQuery} = usersApiSlice;


