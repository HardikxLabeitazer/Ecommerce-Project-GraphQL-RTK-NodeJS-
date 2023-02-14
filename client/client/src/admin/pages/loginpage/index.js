import React, { useEffect, useReducer } from 'react'
import { useLoginUserMutation } from '../../app/store/slices/usersApiSlice';
import {useNavigate} from 'react-router-dom'
import authAdmin from '../../helpers/authAdmin';
import { useDispatch } from 'react-redux';
import { setToken } from '../../app/store/slices/userSlice';

const AdminLogin = () => {

    const dispatch = useDispatch();

    const [loginUser,loginData] = useLoginUserMutation();
    const navigate = useNavigate();

    let initialLoginState = {
        email:'',
        password:'',
    }
    useEffect(()=>{
       
            
            if(authAdmin.isAuthenticated() ){
                  navigate('/admin/')
            }
    },[loginData.data])
    
    const [loginState,setLoginState]= useReducer(LoginReducer,initialLoginState);
    const {email,password} = loginState;


    const handleLogin = async e => {
        e.preventDefault();

       let response = await  loginUser({email,password});
       authAdmin.authenticate(response?.data?.token,()=>{dispatch(setToken(response.data.token)); navigate('/admin/')});
                                
          
    }
    

    return (
        <section className='w-full flex justify-center items-center min-h-screen '>
            <div className='w-1/2 h-[60vh] flex justify-center border border-purple-400'>
                <div className='w-1/2 py-10'>
                    <p className='text-xl py-3 font-semibold text-center'>Admin Login</p>
                    <form className='w-full text-[16px] inline-block space-y-10' onSubmit={handleLogin} >
                        <div>
                            <input onChange={(e)=>setLoginState({type:'SET_EMAIL',payload:e.target.value})} placeholder='Enter Email Here' autoComplete='off' className='border-t-0 w-full  duration-200 focus:duration-300 focus-within:text-[17px] border-r-0 border-l-0 border-b-2 focus-visible:border-indigo-500 outline-none py-2 ' type={"email"} name='email' />
                        </div>
                        <div>
                            <input onChange={(e)=>setLoginState({type:'SET_PASSWORD',payload:e.target.value})} placeholder='Enter Password Here' className='border-t-0 w-full duration-300 focus:duration-300 focus-within:text-[17px] border-r-0 border-l-0 border-b-2 focus-visible:border-indigo-500 outline-none py-2 ' type={"password"} password='password' />
                        </div>
                        <div className='flex justify-center'>
                        <button className='py-2 px-10 bg-purple-500 hover:bg-purple-800 text-white font-semibold rounded-sm shadow'>Submit</button>
                        </div>
                        

                    </form>
                </div>
            </div>
        </section>
    )
}

export default AdminLogin

const LoginReducer = (state,action)=>{
    switch(action.type){
        case "SET_EMAIL":
            return {
                ...state,
                email:action.payload
            }
        case "SET_PASSWORD":
            return {
                ...state,
                password:action.payload
            }
        case "RESET":
            return {
                ...state,
                email:'',
                password:''
            }
        default:
            return state;
    }
}