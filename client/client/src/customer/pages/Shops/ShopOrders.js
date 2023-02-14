import { useMutation, useQuery } from '@apollo/client'
import { graphql } from 'graphql';
import React, { Fragment,useState } from 'react'
import { useParams } from 'react-router';
import graphQLQueries from '../../app/graphql/queries';

const ShopOrders = () => {
    let [orderData,setOrderData] = useState([]);
    let params = useParams();

    let {} =useQuery(graphQLQueries.GET_ORDERS_BY_Seller,{
        variables:{
            shop_id:params.shopId
        },
        onCompleted(data){
            setOrderData(data.getOrdersBySeller.data);
        }
    });

    let [updateOrderDefault] = useMutation(graphQLQueries.UPDATE_ORDER_DEFAULT,{
        onCompleted(data){

        }
    })

    let [updateOrderCancel] = useMutation(graphQLQueries.UPDATE_ORDER_CANCEL,{
        onCompleted(){

        }
    })

    const handleSelect = (e,i,index)=>{
        let order = JSON.parse(JSON.stringify(orderData[i]));
        order.products[index].status = e.target.value;
        let product = order.products[index];
        console.log(product)
        
        if(e.target.value =='Cancelled'){
            updateOrderCancel({
                variables:{
                    product_id:product.product._id,
                    cartID:product._id,
                    quantity:product.quantity,
                    status:'Cancelled',
                    orderID:order._id

                }
            })
        }else{
            updateOrderDefault({
                variables:{
                    cartItemID:product._id,
                    status:e.target.value
                }
            })
        }
    }
    const handleUpdate = (index,pindex)=>{
        console.log(orderData[index].products)
    }
  return (
    <Fragment>
        <div style={{margin:'10px',padding:'20px'}}>
            Total Products:{orderData?.length}
            <div style={{margin:'10px'}}>
                {
                   orderData && orderData?.map((data,i)=>{
                        return <div style={{margin:'10px',border:'1px solid',padding:'10px'}} key={i}>
                            <p>transactionID:{data.transaction_ID}</p>
                        {   
                            data.products?.map((product,index)=>{
                                return ( params.shopId==product.shop._id && <div key={index}>
                                    Name:{product.product.name}<br/>
                                    quantity:{product.quantity}<br/>
                                    {/* status:{product.status} */}
                                    <select defaultValue={product.status} onChange={(e)=>handleSelect(e,i,index)}>
                                       
                                        <option value="Processing">Processing</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Not processed">Not Processed</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>)
                            })
                        }
                        <p style={{fontWeight:'600'}}>Deliver to:

                            {data.delivery_address.state}<br/>
                            {data.delivery_address.street}<br/>
                            {data.delivery_address.city}<br/>
                            {data.delivery_address.zipcode}<br/>
                            {data.delivery_address.country}<br/>
                        </p>
                        <button type="button" onClick={()=>handleUpdate(i)}>Update</button>

                        </div>
                    })
                }
            </div>

        </div>
    </Fragment>
  )
}

export default ShopOrders