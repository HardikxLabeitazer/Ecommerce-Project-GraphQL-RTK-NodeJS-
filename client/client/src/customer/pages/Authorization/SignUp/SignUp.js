import React, { useEffect } from 'react'
import {Form, Input} from 'antd'
import { useMutation } from '@apollo/client';
// import {  SIGN_UP_USER } from '../../../app/graphql/queries/mutations';
import auth from '../../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import graphQLQueries from '../../../app/graphql/queries';

const SignUp = () => {

  const [loginForm] = Form.useForm(); 
  const [signupuser,{error,data,loading}] =useMutation(graphQLQueries.SIGN_UP_USER);
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth.isAuthenticated()!==false){
      navigate('/user')
    }
  },[])


  const handleLogin =values =>{
    signupuser({
      variables:{
        NewUserInput:values
      }
    })

  }
  if(data?.addNewUser){
   
    navigate('/login')
  }
  return (
    <section style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh'}}>
        <div style={{width:'40%',padding:'20px',border:'1px solid gray'}}>
          <Form layout='vertical' form={loginForm} onFinish={handleLogin}>
              <Form.Item name="name" label="Name">
                <Input/>
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input/>
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password/>
              </Form.Item>
              <div style={{display:'flex',justifyContent:'center'}}>
                <button>SignUp</button>
              </div>
              <p>Already have an account<Link to='/login'>Login</Link></p>
          </Form>
        </div>
    </section>
  )
}

export default SignUp