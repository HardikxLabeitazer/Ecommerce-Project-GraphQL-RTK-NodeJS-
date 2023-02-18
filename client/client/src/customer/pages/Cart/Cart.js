import React, { Fragment, Suspense, useEffect, useState } from 'react'
import cartHelp from '../../app/cart/cartHelp';
import { UserAuthFinal } from '../../app/contextapi/UserContext'
import { Modal, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import graphQLQueries from '../../app/graphql/queries';

const Cart = () => {

    const { currentCart, currentUser,refreshCart } = UserAuthFinal();
    const [cartData, setCartData] = useState([] );
    const [checkoutForm] = Form.useForm();
    const [showCheckout, setShowCheckout] = useState(false);
    
  

    let [addNewOrder] = useMutation(graphQLQueries.ADD_NEW_ORDER, {
        onCompleted(data) {
            cartHelp.emptyCart();
            setCartData([]);
            checkoutForm.resetFields();
            setShowCheckout(!showCheckout);
        }
    });

    let [updateCart] = useMutation(graphQLQueries.UPDATE_CART_BY_USER,{
        onCompleted(data){
            refreshCart()
        }
    })

    const handleChange = (e, i) => {
        let updatedCart = [...cartData];
        updatedCart[i].quantity = +e.target.value;
        setCartData(updatedCart);
        cartHelp.updateCart(i, +e.target.value);

    }

    const handleDelete = (index) => {
        const updatedCart = cartHelp.removeCart(index);
        setCartData(updatedCart);
    }

    const handleCheckout = (values) => {

        values.delivery_fee = 40;
        values.packaging_charge = 10;
        values.total = cartHelp.totalItemPrice();
        values.ordered_by = currentUser?._id;
        values.transaction_ID = Date.now().toString();

        let cartDataTemp = cartData?.map((data, i) => {
            return {
                product: data.product._id,
                quantity: data.quantity,
                shop: data.shopID
            }
        })
        values.products = cartDataTemp;

        addNewOrder({
            variables: {
                NewOrderInput: values
            }
        })
    }

    return (
        <Fragment>
          
            <Suspense fallback={<p>Loading...</p>}>
                <section className='w-full min-h-screen flex justify-center'>
                    <div className='w-11/12 ml-10 flex space-x-3'>
                        <div className='w-3/5 p-5 shadow'>
                            <p className='text-lg font-semibold my-3'>Cart Details {"("+ currentCart?.products?.length+")"}</p>
                            {
                                currentCart?.products?.map((data, i) => {
                                    return <div key={i} className='flex relative border-gray-50 items-center hover:border-gray-200 border space-x-3'>
                                        <div>
                                            <img className='w-36 h-36' src={data?.product?.images?.length>0?data?.product?.images[0]:'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100'} />
                                        </div>
                                        <div>
                                            <p className='text-lg'>{data.product?.name}</p>
                                            <span className='flex gap-[2px]'>
                                                <p className='font-semibold'>Seller:</p>
                                                <p>{data.product?.shop?.name}</p>
                                            </span>
                                            <div className='flex gap-[15px] items-center '>
                                                <strike className="text-[13px]">₹{data?.product?.mrp}</strike>
                                                <p className='text-lg font-semibold mt-3'>₹{data?.product?.sellingprice}</p>
                                            </div>
                                            <div className='flex space-x-3 items-center'>
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={() => {updateCart({
                                                    variables:{
                                                        cart_id:currentCart._id,
                                                        product:data.product._id,
                                                        quantity:data.quantity -1
                                                    }
                                                })}}>-</button>
                                                <p className='text-lg mt-3'>{data?.quantity}</p>
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={() => {updateCart({
                                                    variables:{
                                                        cart_id:currentCart._id,
                                                        product:data.product._id,
                                                        quantity:data.quantity +1
                                                    }
                                                })}}>+</button>

                                            </div>
                                            <div className='flex space-x-6 items-center'>
                                                <p className='text-[16px] font-semibold cursor-pointer '>SAVE FOR LATER</p>
                                                <p onClick={() => {  }} className='text-[16px] cursor-pointer font-semibold'>REMOVE</p>
                                            </div>
                                        </div>
                                        <div className='absolute right-14 font-semibold text-[15px] top-10'>Delivery in 3 days</div>
                                    </div>
                                })
                            }

                            <button className='px-5 py-2 bg-gradient-to-l from-purple-400 to-purple-600 text-white rounded'>CheckOut</button>
                        </div>
                        <div className='w-1/3 fixed right-20 top-2'>
                            <p className='mx-3 my-3 text-gray-400 font-semibold text-lg'>Price Details</p>
                            <hr className='my-2' />
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Price({currentCart?.total_quantity}) items</p>
                                <p>₹{currentCart.total_amount + currentCart.total_discount || 0}</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Discount</p>
                                <p className='text-green-500'>- ₹{currentCart?.total_discount || 0}</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Delivery Charges</p>
                                <p className='text-green-500 text-[15px]'>FREE</p>
                            </span>
                            <hr className='my-2 ' />
                            <span className='flex items-center justify-between mx-3 text-[21px] font-semibold'>
                                <p>Total Amount</p>
                                <p className=''>₹{currentCart?.total_amount || 0}</p>
                            </span>
                            <hr className='my-2' />
                            <p className='mx-3 text-green-500 text-[16px] font-semibold'>You will Save ₹{currentCart?.total_discount || 0} on this order</p>
                        </div>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default Cart