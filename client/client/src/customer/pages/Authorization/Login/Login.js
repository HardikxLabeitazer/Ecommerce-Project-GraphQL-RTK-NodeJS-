import React, { useEffect } from 'react'
import {Form, Input} from 'antd'
import { useMutation } from '@apollo/client';


import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../../app/contextapi/UserContext';
// import { SIGN_IN_USER } from '../../../app/graphql/queries/mutations';
import auth from '../../../app/auth/auth';
import graphQLQueries from '../../../app/graphql/queries';
import { resolveReadonlyArrayThunk } from 'graphql';


const Login = () => {

  const {updateData,cartUpdate} = UserAuthFinal();
  const [loginForm] = Form.useForm(); 
  const navigate = useNavigate();

  const [signupuser,{error,data,loading}] =useMutation(graphQLQueries.SIGN_IN_USER,{
    onCompleted(data){
      auth.authenticate(data.signin.token,()=>{console.log(data.signin.token)});
      navigate('/');
      cartUpdate();
    }
  });
  


  const handleLogin =values =>{
    signupuser({
      variables:values
    })
  }
  // if(data?.signin){
    
  //   auth.authenticate(data.signin.token,()=>console.log(data.signin.token))
  //   // sessionStorage.setItem('user_id',data.signin.data._id);
  //   navigate('/user')
  //   updateData();
  // }
  return (
    <section style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh'}}>
        <div style={{width:'40%',padding:'20px',border:'1px solid gray'}}>
          <Form layout='vertical' form={loginForm} onFinish={handleLogin}>
              <Form.Item name="email" label="Email">
                <Input/>
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password/>
              </Form.Item>
              <div style={{display:'flex',justifyContent:'center'}}>
                <button>Login</button>
              </div>
              <p>Don't have an account<Link to="/signup">SignUp</Link></p>
              <p>Are you a Seller?Opt for Seller Account<Link to="/seller">Seller Account</Link></p>
          </Form>
        </div>
    </section>
  )
}

export default Login