import { Select, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiOutlineEdit } from 'react-icons/ai'
import { useGetAllSellersQuery } from '../../app/store/slices/sellersApiSlice';
import { AdminAuthFinal } from '../../contextapi/AdminContext';



const SellersAdmin = () => {

    const {currentUser} = AdminAuthFinal();
    const sellerData = useGetAllSellersQuery({_id:currentUser?._id});

    let initialState = {
        current: 1,
        pageSize: 5,
        status: '',
        shop: '',
        total: sellerData?.data?.data?.length

    }
    const [sellerState, setSellerState] = useReducer(reducer, initialState);


    const handleEditClick = (seller) => {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        { title: 'User Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Updated', dataIndex: 'updated' },
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
        setSellerState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleStatusChange = e => {
        setSellerState({ type: 'SET_STATUS', payload: e });

    }

    return (
        <AdminLayout>
             <div className='mt-6 flex space-x-5 justify-end mx-10'>
               
                <Select  onChange={handleStatusChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>

            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={columns}
                    onChange={handlePagination}
                    className="border border-b-gray-100"
                    pagination={{ current: sellerState.current, pageSize: sellerState.pageSize, total: sellerState.total }}
                    loading={sellerData.isLoading}
                    dataSource={
                        sellerData?.data?.data?.map((seller, index) => {
                            return {
                                key: (sellerState.current - 1) * sellerState.pageSize + index + 1,
                                ...seller
                            }
                        })
                    } />
            </section>

        </AdminLayout>
    )
}

export default SellersAdmin;

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

