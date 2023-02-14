import { Dropdown, Select, Table, Tooltip } from 'antd';
import React, { Fragment, useEffect, useReducer } from 'react'
import AdminLayout from '../../layouts/AdminLayout';
import { AiOutlineEdit } from 'react-icons/ai'
import { useGetAllProductsQuery } from '../../app/store/slices/productsApiSlice'
import { useSelector } from 'react-redux';
import { AdminAuthFinal } from '../../contextapi/AdminContext';

const ProductsAdmin = () => {

    const { currentUser } = AdminAuthFinal();

    const productsData = useGetAllProductsQuery({ _id: currentUser?._id });

    let initialState = {
        current: 1,
        pageSize: 10,
        status: '',
        shop: '',
        seller:'',
        total: productsData?.data?.data?.length

    }
    const [productState, setProductState] = useReducer(productReducer, initialState);

    let {current,pageSize,total,shop,status,seller} = productState;

    useEffect(()=>{
        console.log(shop,status,seller)
    },[shop,status])

    


    const handleEditClick = (product) => {

    }

    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        { title: 'Product Name', dataIndex: 'name' },
        { title: 'MRP', dataIndex: 'mrp' },
        { title: 'Selling Price', dataIndex: 'sellingprice' },
        { title: 'Created On', dataIndex: 'created' },
        {
            title: 'Alter',
            render: (product) => {
                const handleEdit = () => {
                    handleEditClick(product);
                }
                return (
                    <Tooltip placement='right' title="Edit Product">
                        <div><AiOutlineEdit /></div>
                    </Tooltip>
                )
            }


        }
    ]

    const handlePagination = ({ current, pageSize }) => {
        setProductState({ type: 'PAGE_SIZE_CHANGE', payload: { current, pageSize } });
    }

    const handleShopChange = e => {
        
        setProductState({ type: 'SET_SHOP_ID', payload: e });
        
        
    }

    const handleStatusChange = e => {
        setProductState({ type: 'SET_STATUS', payload: e });
        
    }
    const handleSellerChange = e => {
        setProductState({ type: 'SET_SELLER_ID', payload: e });
        
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
                <Select  onChange={handleStatusChange} className='w-[150px]' placeholder="Choose Filter">
                    <Select.Option value='123'></Select.Option>
                    <Select.Option value='789'></Select.Option>
                </Select>

            </div>
            <section className='w-11/12 mx-10 mt-6'>
                <Table columns={columns}
                    className="border border-b-gray-100"
                    onChange={handlePagination}
                    pagination={{ current, pageSize, total }}
                    loading={productsData.isLoading}
                    dataSource={
                        productsData?.data?.data?.map((product, index) => {
                            return {
                                key: index + 1,
                                ...product
                            }
                        })
                    } />
            </section>

        </AdminLayout>
    )
}

export default ProductsAdmin;

const productReducer = (state, action) => {
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
                seller:action.payload
            }
        default:
            return state;
    }
}

