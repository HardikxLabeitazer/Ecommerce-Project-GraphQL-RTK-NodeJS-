import React, { Fragment, Suspense, useState } from 'react'
import cartHelp from '../../app/cart/cartHelp';
import { UserAuthFinal } from '../../app/contextapi/UserContext'
import { Modal, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import graphQLQueries from '../../app/graphql/queries';

const Cart = () => {

    const { currentCart, currentUser } = UserAuthFinal();
    const [cartData, setCartData] = useState(currentCart ? currentCart : []);
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
            {/* <div style={{ margin: '10px', padding: '20px' }}>
                {
                    cartData?.map((data,i)=>{
                        return <div key={i} style={{ display: 'flex',justifyContent:'space-evenly' }}>
                        <p>{data.product.name}</p>
                        <input style={{ outline:'none'}} value={data?.quantity} type="text"  onChange={(e) => handleChange(e,i)} />
                        <button onClick={()=>handleDelete(i)}>Delete</button>
                    </div>
                    })
                }
                
                <p>Total {cartHelp.totalItemPrice()}</p>
                <button onClick={()=>setShowCheckout(!showCheckout)}>Checkout</button>
                
              

            </div>
            <Modal footer="" open={showCheckout} onCancel={()=>setShowCheckout(!showCheckout)} title="Checkout">
                <Form layout='vertical' onFinish={handleCheckout} form={checkoutForm}>
                    <Form.Item name="customer_name" label="Name">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="customer_email" label="Email">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['delivery_address','street']} label="Street">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['delivery_address','city']} label="City">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['delivery_address','state']} label="State">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['delivery_address','zipcode']} label="Zipcode">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['delivery_address','country']} label="Country">
                        <Input/>
                    </Form.Item>
                    <button>Place Order</button>

                </Form>
            </Modal> */}
            <Suspense fallback={<p>Loading...</p>}>
                <section className='w-full min-h-screen flex justify-center'>
                    <div className='w-11/12 ml-10 flex space-x-3'>
                        <div className='w-3/5 p-5 shadow'>
                            <p className='text-lg font-semibold my-3'>Cart Details</p>
                            {
                                cartData?.map((data, i) => {
                                    return <div key={i} className='flex relative border-gray-50 items-center hover:border-gray-200 border space-x-3'>
                                        <div>
                                            <img className='w-36 h-36' src={data.product?.images[0] || ''} />
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
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={() => cartHelp.decreaseQuantity(i, () => { setCartData(cartHelp.getCart) })}>-</button>
                                                <p className='text-lg mt-3'>{data?.quantity}</p>
                                                <button className='py-1 font-semibold px-3  bg-gray-100 ' onClick={() => cartHelp.increaseQuantity(i, () => { setCartData(cartHelp.getCart) })}>+</button>

                                            </div>
                                            <div className='flex space-x-6 items-center'>
                                                <p className='text-[16px] font-semibold cursor-pointer '>SAVE FOR LATER</p>
                                                <p onClick={() => { cartHelp.removeCart(i); cartHelp.getCart() }} className='text-[16px] cursor-pointer font-semibold'>REMOVE</p>
                                            </div>
                                        </div>
                                        <div className='absolute right-14 font-semibold text-[15px] top-10'>Delivery in 3 days</div>
                                    </div>
                                })
                            }
                        </div>
                        <div className='w-1/3 '>
                            <p className='mx-3 my-3 text-gray-400 font-semibold text-lg'>Price Details</p>
                            <hr className='my-2' />
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Price({cartData?.length}) items</p>
                                <p>₹{cartHelp.totalItemPrice()?.mrptotal || 0}</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Discount</p>
                                <p className='text-green-500'>- ₹{cartHelp.totalItemPrice().mrptotal - cartHelp.totalItemPrice()?.total || 0}</p>
                            </span>
                            <span className='flex items-center justify-between mx-3 text-lg font-semibold'>
                                <p>Delivery Charges</p>
                                <p className='text-green-500 text-[15px]'>FREE</p>
                            </span>
                            <hr className='my-2 ' />
                            <span className='flex items-center justify-between mx-3 text-[21px] font-semibold'>
                                <p>Total Amount</p>
                                <p className=''>₹{cartHelp.totalItemPrice().total}</p>
                            </span>
                            <hr className='my-2' />
                            <p className='mx-3 text-green-500 text-[16px] font-semibold'>You will Save ₹{cartHelp.totalItemPrice().mrptotal - cartHelp.totalItemPrice().total} on this order</p>
                        </div>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default Cart