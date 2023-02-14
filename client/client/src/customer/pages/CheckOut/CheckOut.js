import { useMutation } from '@apollo/client';
import { Form, Input } from 'antd'
import React, { Suspense, useEffect } from 'react'
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';

const CheckOut = () => {

    const [orderForm] = Form.useForm();

    const {currentBuyProduct,setCurrentBuyProduct,currentUser} = UserAuthFinal();

    let [addNewOrder] = useMutation(graphQLQueries.ADD_NEW_ORDER,{
        onCompleted(data){
            
        }
    });

    useEffect(()=>{
        console.log(currentBuyProduct)
    },[])
    
    const handleOrderFinish = (values) => {
        values.delivery_fee = 40;
        values.packaging_charge = 10;
        values.total = currentBuyProduct.price;
        values.ordered_by = currentUser?._id;
        values.transaction_ID = Date.now().toString();
       
        
        let {product,quantity,shop} = currentBuyProduct;
        values.products = [{product:product._id,quantity,shop}];
        // console.log(values);
        addNewOrder({
            variables:{
                NewOrderInput:values
            }
        })
    }



    return (
        <Suspense fallback={<p>Loading........</p>}>
            <section className='w-full min-h-screen flex justify-center'>
                <div className='w-11/12 flex space-x-10 min-h-screen' >
                    <div className='w-3/4 bg-gray-200 p-10 flex justify-center'>
                        <Form layout={"vertical"} className="w-3/4" requiredMark={"false"} form={orderForm} onFinish={handleOrderFinish}>
                            <p className='my-4 text-xl font-semibold'>Delivery Details</p>
                            <Form.Item className='w-1/2' name="customer_name" label="Name">
                                <Input style={{ padding: '6px' }} />
                            </Form.Item>
                            <div className='flex gap-[10px] w-full'>
                                <Form.Item className='w-full' name="customer_email" label="Email">
                                    <Input style={{ padding: '6px' }} />
                                </Form.Item>
                                <Form.Item className='w-full' name="phone" label="Phone">
                                    <Input style={{ padding: '6px' }} />
                                </Form.Item>
                            </div>

                            <Form.Item name={['delivery_address', 'street']} label="Address">
                                <Input.TextArea rows={6} style={{ padding: '6px' }} />
                            </Form.Item>
                            <div className='flex gap-[10px]'>
                                <Form.Item className='w-full' name={['delivery_address', 'city']} label="City">
                                    <Input style={{ padding: '6px' }} />
                                </Form.Item>
                                <Form.Item className='w-full' name={['delivery_address', 'state']} label="State">
                                    <Input style={{ padding: '6px' }} />
                                </Form.Item>
                            </div>

                            <Form.Item name={['delivery_address', 'zipcode']} label="Zipcode">
                                <Input style={{ padding: '6px' }} />
                            </Form.Item>
                            <Form.Item name={['delivery_address', 'country']} label="Country">
                                <Input style={{ padding: '6px' }} />
                            </Form.Item>
                            <button className='border shadow bg-orange-500 text-white py-3 px-5'>Confirm</button>
                        </Form>
                    </div>
                    <div className='w-[300px] bg-gray-50'>
                        <p className='my-2 mx-4 text-lg text-gray-400 font-semibold'>Price Details</p>
                        <hr className='my-2'/>
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Price</p>
                            <p>₹{currentBuyProduct.product.sellingprice}</p>
                        </div>
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Delivery Charges</p>
                            <p className='text-green-500'>Free</p>
                        </div>
                        <div className=' mx-4 text-lg flex justify-between'>
                            <p>Packaging Charge</p>
                            <p className='text-green-500'>Free</p>
                        </div>
                        <hr className='my-2'/>
                        <div className=' mx-4 text-[20px] flex justify-between'>
                            <p>Total Payable</p>
                            <p className=''>₹{currentBuyProduct.product.sellingprice}</p>
                        </div>
                        <hr className='mt-10 mb-2'/>
                        <div>
                            <div className='flex justify-center'>
                                <img src={currentBuyProduct.product.images[0] || ""} className="w-40 h-40 "/>
                            </div>
                            <div className='mx-5 font-semibold text-center'>
                                <p>{currentBuyProduct.product.name}</p>
                                <p>₹{currentBuyProduct.product.sellingprice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    )
}

export default CheckOut