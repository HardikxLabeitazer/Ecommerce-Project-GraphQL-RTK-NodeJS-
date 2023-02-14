import { Select, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiOutlineEdit } from 'react-icons/ai'
import { useGetAllUsersQuery } from '../../app/store/slices/usersApiSlice';
import { AdminAuthFinal } from '../../contextapi/AdminContext';


const UsersAdmin = () => {

    const { currentUser } = AdminAuthFinal();

    const userData = useGetAllUsersQuery({ _id: currentUser?._id });
    let initialState = {
        current: 1,
        pageSize: 5,
        status: '',
        shop: '',
        total: userData?.data?.data?.length

    }

    const [userState, setUserState] = useReducer(reducer, initialState);


    const handleEditClick = (user) => {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        { title: 'User Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Updated', dataIndex: 'updated' },
        { title: 'Created On', dataIndex: 'created' },
        {
            title: 'Alter',
            render: (user) => {
                const handleEdit = () => {
                    handleEditClick(user);
                }
                return (
                    <Tooltip placement='right' title="Edit User">
                        <div><AiOutlineEdit /></div>
                    </Tooltip>
                )
            }


        }
    ]

    const handlePagination = ({ current, pageSize }) => {
        setUserState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleStatusChange = e => {
        setUserState({ type: 'SET_STATUS', payload: e });

    }

    return (
        <AdminLayout>
            <div className='mt-6 flex space-x-5 justify-end mx-10'>

                <Select onChange={handleStatusChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>

            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={columns}
                    onChange={handlePagination}
                    className="border border-b-gray-100"
                    pagination={{ current: userState.current, pageSize: userState.pageSize, total: userState.total }}
                    loading={userData.isLoading}
                    dataSource={
                        userData?.data?.data?.map((user, index) => {
                            return {
                                key: (userState.current - 1) * userState.pageSize + index + 1,
                                ...user
                            }
                        })
                    } />
            </section>

        </AdminLayout>
    )
}

export default UsersAdmin;

const reducer = (state, action) => {
    switch (action.type) {
        case 'PAGE_SIZE_CHANGE':
            return {
                ...state,
                current: action.payload.current,
                pageSize: action.payload.pageSize
            }
        case 'SET_STATUS':
            return {
                ...state,
                status:action.payload
            }
        default:
            return state;
    }
}

