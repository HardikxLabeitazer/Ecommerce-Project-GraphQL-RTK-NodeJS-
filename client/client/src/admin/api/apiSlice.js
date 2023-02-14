import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';
import authAdmin from '../helpers/authAdmin';

let token = authAdmin.isAuthenticated();

const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4000/admin',prepareHeaders(headers,{getState}){
        headers.set('Authorization',`Bearer ${token?token:getState().user.token}`);
        headers.set('Content-Type','application/json')

        return headers;
    }}),
    
    endpoints:builder=>({})

    
})

export default apiSlice;