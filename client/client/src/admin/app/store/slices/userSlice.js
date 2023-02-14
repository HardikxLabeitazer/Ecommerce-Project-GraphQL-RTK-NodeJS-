import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../../../api/apiSlice";


let initialState = {
    token:'',
    
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
        }
    },
    
})

export const {setToken} = userSlice.actions;
export const userReducer = userSlice.reducer;
