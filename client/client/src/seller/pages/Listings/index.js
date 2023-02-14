import { useQuery } from '@apollo/client';
import { Table, Tooltip } from 'antd';
import React, { useReducer } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import graphQLQueries from '../../app/graphql';
import { SellerAuthFinal } from '../../app/providers/SellerContext'
import SellerLayout from '../../layouts/SellerLayout'

const SellerListings = () => {

  const { currentShop } = SellerAuthFinal();

  let initialListingsState = {
    current: 1,
    pageSize: 10,
    total: 100
  }

  const [listingState,setListingState] = useReducer(listingReducer,initialListingsState);

  let {current,pageSize,total} = listingState;

  let listingsData = useQuery(graphQLQueries.GET_ALL_PRODUCTS_BY_SHOP, {
    variables: {
      _id: currentShop?._id
    }
  })

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
                // handleEditClick(product);
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
    setListingState({ type: 'SET_PAGINATION', payload: { current, pageSize } });
  }

  return (
    <SellerLayout>
      <section className='mx-10 mt-6'>
        <Table columns={columns}
          className="border border-b-gray-100"
          onChange={handlePagination}
          pagination={{ current, pageSize, total }}
          loading={listingsData.loading}
          dataSource={
            listingsData?.data?.getAllProductsByShop?.data?.map((product, index) => {
              return {
                key: index + 1,
                ...product
              }
            })
          } />
      </section>

    </SellerLayout>
  )
}

export default SellerListings


const listingReducer = (state,action)=>{
  switch(action.type){

    case 'SET_PAGINATION':
      return {
        ...state,
        current:action.payload.current,
        pageSize:action.payload.current
      }
    default:
      return state;
  }
}