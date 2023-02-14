import { useQuery } from '@apollo/client';
import { Table, Tooltip } from 'antd';
import React, { useReducer } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import graphQLQueries from '../../app/graphql/index.js';

import { SellerAuthFinal } from '../../app/providers/SellerContext';

import SellerLayout from '../../layouts/SellerLayout';

const SellerOrders = () => {

    const { currentShop } = SellerAuthFinal();


    let initialSellerState = {
        current:1,
        pageSize:10,
        total:100
    }
    const [sellerState, setSellerState] = useReducer(sellerReducer, initialSellerState);
    let ordersData = useQuery(graphQLQueries.GET_ORDERS_BY_SELLER, {
        variables: {
            shop_id: currentShop?._id
        }
    });

    let {current,pageSize,total} = sellerState;

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
                    // handleEditClick(order);
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
        setSellerState({ type: 'SET_PAGINATION', payload: { current, pageSize } });
    }

    return (
        <SellerLayout>
            <section className='mt-10 mx-10'>
                <Table columns={columns}
                    className='border border-b-gray-100 '
                    onChange={handlePagination}
                    pagination={{ current,pageSize,total}}
                    loading={ordersData.loading}
                    dataSource={
                        ordersData?.data?.getOrdersBySeller?.data?.map((order, index) => {
                            return {
                                key: (current - 1) * pageSize + index + 1,
                                ...order
                            }
                        })
                    } />
            </section>

        </SellerLayout>
    )
}

export default SellerOrders;

const sellerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGINATION':
            return {
                ...state,
                current:action.payload.current,
                pageSize:action.payload.pageSize
            }
        default:
            return state;
    }
}