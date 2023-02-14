import { Select, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiOutlineEdit } from 'react-icons/ai'
import { useGetAllOrdersQuery } from '../../app/store/slices/ordersApiSlice';
import { AdminAuthFinal } from '../../contextapi/AdminContext';


const OrdersAdmin = () => {

    const { currentUser } = AdminAuthFinal();

    const orderData = useGetAllOrdersQuery({ _id: currentUser?._id });
    let initialState = {
        current: 1,
        pageSize: 5,
        status: '',
        shop: '',
        total: orderData?.data?.data?.length,
        user:''

    }
    const [orderState, setOrderState] = useReducer(reducer, initialState);


    const handleEditClick = (order) => {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        { title: 'Customer Name', dataIndex: 'customer_name' },
        { title: 'Customer Email', dataIndex: 'customer_email' },
        { title: 'Transaction ID', dataIndex: 'transaction_ID' },
        { title: 'Created On', dataIndex: 'created' },
        {
            title: 'Alter',
            render: (order) => {
                const handleEdit = () => {
                    handleEditClick(order);
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
        setOrderState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleShopChange = e => {

        setOrderState({ type: 'SET_SHOP_ID', payload: e });


    }

    const handleStatusChange = e => {
        setOrderState({ type: 'SET_STATUS', payload: e });

    }
    const handleSellerChange = e => {
        setOrderState({ type: 'SET_SELLER_ID', payload: e });

    }
    const handleUserChange = e => {
        setOrderState({ type: 'SET_SELLER_ID', payload: e });

    }

    return (
        <AdminLayout>
            <div className='mt-6 flex space-x-5 justify-end mx-10'>
                <Select  onChange={handleShopChange} className='w-[150px]' placeholder="Enter Shop ID">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='45'></Select.Option>
                </Select>
                <Select  onChange={handleSellerChange} className='w-[150px]' placeholder="Choose Seller">
                    <Select.Option value='abc'></Select.Option>
                    <Select.Option value='def'></Select.Option>
                </Select>
                <Select  onChange={handleUserChange} className='w-[150px]' placeholder="Choose User">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>
                <Select  onChange={handleStatusChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>

            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={columns}
                    className='border border-b-gray-100 '
                    onChange={handlePagination}
                    pagination={{ current: orderState.current, pageSize: orderState.pageSize, total: orderState.total }}
                    loading={orderData.isLoading}
                    dataSource={
                        orderData?.data?.data?.map((order, index) => {
                            return {
                                key: (orderState.current - 1) * orderState.pageSize + index + 1,
                                ...order
                            }
                        })
                    } />
            </section>

        </AdminLayout>
    )
}

export default OrdersAdmin;

const reducer = (state, action) => {
    switch (action.type) {
        case 'PAGE_SIZE_CHANGE':
            return {
                ...state,
                current: action.payload.current,
                pageSize: action.payload.pageSize
            }

        case 'SET_SHOP_ID':
            return {
                ...state,
                shop: action.payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'SET_SELLER_ID':
            return {
                ...state,
                seller: action.payload
            }
        case 'SET_USER_ID':
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}
