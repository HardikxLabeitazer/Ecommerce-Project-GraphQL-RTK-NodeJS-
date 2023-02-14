import { useQuery } from '@apollo/client'
import { Checkbox, Input } from 'antd';
import React, { Fragment, Suspense, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';


const Order = () => {
    let { currentUser } = UserAuthFinal();


    let orderQueryData = useQuery(graphQLQueries.GET_ORDERS_BY_USER, {
        variables: {
            _id: currentUser?._id
        }
    });
    return (
        <Fragment>
            <Suspense fallback={<p>Loading....</p>}>
                <section className='flex w-full'>
                    <div className='w-1/5'>
                        <div className='mt-16 ml-1 h-[70vh] px-5 border shadow'>
                            <p className='text-[20px] font-semibold my-3'>Filters</p>
                            <p className='text-[16px] font-semibold my-3'>ORDER STATUS</p>
                            <ul>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>On the Way</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>Cancelled</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>Returned</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>Delivered</p></li>
                                
                            </ul>
                            <p className='text-[16px] font-semibold my-3'>ORDER TIME</p>
                            <ul>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>Last 30 Days</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>2022</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>2021</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>2020</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>2019</p></li>
                                <li className='flex gap-[15px] font-semibold'><Checkbox/><p>Older</p></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='w-4/5 mr-10 mt-10 mb-10 ml-5'>
                        <p className='text-lg font-semibold'>Orders</p>
                        <div className='w-4/5 flex'>
                            <Input placeholder='Search your orders here'/>
                            <button className='px-6 py-[8px] whitespace-nowrap bg-purple-500 text-white hover:bg-purple-600 flex items-center rounded-sm shadow font-semibold '><AiOutlineSearch className='mt-[2px] mr-2' size={20}/> Search Orders</button>
                        </div>
                        {
                            orderQueryData?.data?.getOrderByUserID?.data?.map((order, i) => {
                                return <div className='border p-3 relative items-center flex pl-8 pr-28 my-3 hover:shadow-md hover:duration-200 justify-between' key={i}>
                                    <div className='flex space-x-3'>
                                        <img src={order?.products[0].product.images[0] || ''} alt="" className='w-20 h-20' />
                                        <div>
                                            <p className='font-semibold text-[15px]'>{order?.products[0].product?.name}</p>
                                            <p className='text-gray-400 text-[12px]'>Color: Grey</p>
                                        </div>
                                    </div>
                                    <div className='absolute left-[50%]'>
                                        ₹{order?.products[0].product?.mrp}
                                    </div>
                                    <div className='font-semibold'>
                                        {
                                            order?.status || 'Processing'
                                        }
                                    </div>

                                </div>
                            })
                        }
                    </div>

                </section>
            </Suspense>
        </Fragment>
    )
}

export default Order