import { Select, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiOutlineEdit } from 'react-icons/ai'
import { useGetAllShopsQuery } from '../../app/store/slices/shopsApiSlice';
import { AdminAuthFinal } from '../../contextapi/AdminContext';

const ShopsAdmin = () => {

    const { currentUser } = AdminAuthFinal();
    const shopData = useGetAllShopsQuery({ _id: currentUser?._id });
    let initialState = {
        current: 1,
        pageSize: 5,
        status: '',
        shop: '',
        total: shopData?.data?.data?.length

    }

    const [shopState, setShopState] = useReducer(reducer, initialState);


    const handleEditClick = (shop) => {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        { title: 'Shop Name', dataIndex: 'name' },
        { title: 'Location', dataIndex: 'location' },
        { title: 'Ratings', dataIndex: 'ratings' },
        { title: 'Created On', dataIndex: 'created' },
        {
            title: 'Alter',
            render: (seller) => {
                const handleEdit = () => {
                    handleEditClick(seller);
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
        setShopState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleStatusChange = e => {
        setShopState({ type: 'SET_STATUS', payload: e });

    }
    const handleSellerChange = e => {
        setShopState({ type: 'SET_SELLER_ID', payload: e });

    }

    return (
        <AdminLayout>
            <div className='mt-6 flex space-x-5 justify-end mx-10'>

                <Select onChange={handleSellerChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>
                <Select onChange={handleStatusChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>


            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={columns}
                 className="border border-b-gray-100"
                    onChange={handlePagination}
                    pagination={{ current: shopState.current, pageSize: shopState.pageSize, total: shopState.total }}
                    loading={shopData.isLoading}
                    dataSource={
                        shopData?.data?.data?.map((shop, index) => {
                            return {
                                key: (shopState.current - 1) * shopState.pageSize + index + 1,
                                ...shop
                            }
                        })
                    } />
            </section>

        </AdminLayout>
    )
}

export default ShopsAdmin;

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
                status: action.payload
            }
        case 'SET_SELLER_ID':
            return {
                ...state,
                seller: action.payload
            }
        default:
            return state;
    }
}
