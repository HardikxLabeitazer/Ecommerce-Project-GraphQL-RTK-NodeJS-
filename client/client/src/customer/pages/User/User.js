import React, { Fragment, Suspense, useEffect, useReducer } from 'react'
import { Form, Input } from 'antd'
import { useMutation } from '@apollo/client';
import { SIGN_UP_USER, UPDATE_USER } from '../../app/graphql/queries/mutations';
import auth from '../../app/auth/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';

const User = () => {

  const [updateForm] = Form.useForm();
  const { updateData, currentUser } = UserAuthFinal();
  const [updateUser, { error, data, loading }] = useMutation(graphQLQueries.UPDATE_USER);
  const navigate = useNavigate();


  let initialUserPageState = {
    tab: "0"
  }



  const [userPageState, setUserPageState] = useReducer(UserPageReducer, initialUserPageState);
  const { tab } = userPageState;


  useEffect(() => {
    if (auth.isAuthenticated() == false) {
      navigate('/login')
    }

    updateForm.setFieldsValue({
      name: currentUser?.name,
      email: currentUser?.email
    })

    console.log(tab)

  }, [currentUser, tab])


  const handleUpdate = values => {
    values._id = currentUser._id
    updateUser({
      variables: {
        UpdateUserInput: values
      }
    })

    updateData();
  }

  const Tabs = ({ name, current, children }) => {
    return (

      <div className={`${name === current ? 'w-4/5 min-h-screen border' : 'hidden'} `} children={children} />

    )
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <section className='flex justify-center min-h-screen'>
        <div className='w-4/5 flex min-h-screen'>
          <div className='w-1/4  '>
            <ul className='pt-10  text-center text-lg min-h-screen shadow'>
              <li onClick={() => setUserPageState({ type: 'SET_TAB', payload: "0" })} className={`py-3 border  hover:bg-gray-100 cursor-pointer border-gray-100 ${tab == '0' ? 'bg-gray-200' : ''}`}>User Details</li>
              <li onClick={() => setUserPageState({ type: 'SET_TAB', payload: "1" })} className={`py-3 border  hover:bg-gray-100 cursor-pointer border-gray-100 ${tab == '1' ? 'bg-gray-200' : ''}`}>Orders</li>
              <li onClick={() => setUserPageState({ type: 'SET_TAB', payload: "2" })} className={`py-3 border  hover:bg-gray-100 cursor-pointer border-gray-100 ${tab == '2' ? 'bg-gray-200' : ''}`}>Addresses</li>
              <li onClick={() => setUserPageState({ type: 'SET_TAB', payload: "3" })} className={`py-3 border  hover:bg-gray-100 cursor-pointer border-gray-100 ${tab == '3' ? 'bg-gray-200' : ''}`}>Saved Cards</li>
            </ul>
          </div>
          <div className='w-3/4 '>
            <Tabs name="0" current={tab}>
              <div className='mx-10 py-10'>
              <Form className='w-1/2 ' layout='vertical' form={updateForm} onFinish={handleUpdate}>
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input.Password />
                </Form.Item>
                <div className=''>
                  <button className='py-2 px-5 bg-orange-500 text-white font-semibold hover:bg-orange-600 rounded shadow'>Update</button>
                </div>

              </Form>
              </div>
            </Tabs>
            <Tabs name="1" current={tab}>
              TAb 1
            </Tabs>
            <Tabs name="2" current={tab}>
              TAb 2
            </Tabs>
            <Tabs name="3" current={tab}>
              TAb 3
            </Tabs>
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default User


{/* <div style={{width:'40%',padding:'20px',border:'1px solid gray'}}>
          <Form layout='vertical' form={updateForm} onFinish={handleUpdate}>
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
                <button>Update</button>
              </div>
             
          </Form>
        </div> */}



const UserPageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAB':
      return {
        ...state,
        tab: action.payload
      }
    default:
      return state;
  }
}