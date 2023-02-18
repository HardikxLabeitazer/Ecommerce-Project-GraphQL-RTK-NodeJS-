import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, notification, Switch } from 'antd'
import React, { useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { useParams } from 'react-router';
import { ImageUploadComponent, imageUploadMultiple } from '../../../app/graphql/imageUpload';
import graphQLQueries from '../../app/graphql';
import { SellerAuthFinal } from '../../app/providers/SellerContext';
import SellerLayout from '../../layouts/SellerLayout'

const EditProduct = () => {

    const params = useParams();
    const [productStatus, setProductStatus] = useState();
    const [updateForm] = Form.useForm();
    const { currentShop } = SellerAuthFinal();

    const [updateProduct] = useMutation(graphQLQueries.UPDATE_PRODUCT_BY_ID,{
        
        refetchQueries:[
            {
                query:graphQLQueries.GET_ALL_PRODUCTS_BY_SHOP,variables:{_id:currentShop._id}
            }
        ],
        
    });
    const [updateProductStatus] = useMutation(graphQLQueries.UPDATE_PRODUCT_STATUS,{
        onCompleted(){
            notification.success({
                message:'Product Status Changed Successfully',
                placement:'bottomRight'
            })
        }
    });
    const productData = useQuery(graphQLQueries.GET_PRODUCT_BY_ID, {
        variables: {
            _id: params.productId
        },
        onCompleted(data) {
            updateForm.setFieldsValue({
                ...data.getProductByID.data,
                images: data.getProductByID.data.images?.length > 0 ? data.getProductByID.data.images.map((img, i) => { return { uid: i, name: 'image' + i + ".png", status: "done", url: img } }) : []
            })

            setProductStatus(data.getProductByID.data.active);
        },
        
    },)

    
    const handleProductUpdate = async (values) => {
        values.shop = currentShop._id;
        values.owner = currentShop.owner._id;
        values._id = params.productId;

        delete values.images;
        updateProduct({
            variables: {
                UpdateProductInput: values
            }
        })
        
            notification.success({
                message:'Product Succesfully Updated',
                placement:'bottomRight'
            })
        
    }





    const filter = (value) => +value;

    return (
        <SellerLayout>
            <section>
                <div className='flex justify-end mx-10'>
                    <div>
                        <p></p>
                        <Switch checked={productStatus} onChange={(status)=>{setProductStatus(status); updateProductStatus({variables:{_id:params.productId,active:status}})}}/>
                    </div>
                </div>
                <Form layout='vertical' requiredMark={false} form={updateForm} onFinish={handleProductUpdate}>
                    <div className='flex justify-between items-center mx-5 mt-4'>
                        <p className='text-2xl font-semibold'>Update Product</p>
                        <button className='w-[130px] font-semibold cursor-pointer h-[38px] rounded-md shadow text-white bg-gradient-to-l from-orange-400 to-orange-600'>
                            Update
                        </button>
                    </div>
                    <div className='mx-5 w-1/3'>
                        <Form.Item name="name" label="Product Name" >
                            <Input placeholder="Enter Product Name" />
                        </Form.Item>
                        <ImageUploadComponent disabled={true} name={["images"]} max="10" />
                        <Form.Item normalize={filter} name="mrp" label="MRP">
                            <Input placeholder='Enter MRP' />
                        </Form.Item>
                        <Form.Item normalize={filter} name="sellingprice" label="Selling Price">
                            <Input placeholder='Enter Selling Price' />
                        </Form.Item>
                        <Form.Item name="category" label="Category">
                            <Input placeholder='Enter Category' />
                        </Form.Item>
                        <Form.Item normalize={filter} name="quantity" label="Quantity">
                            <Input placeholder='Enter Quantity' />
                        </Form.Item>
                        <Form.Item name="weight" label="Weight">
                            <Input placeholder='Enter Product Weight' />
                        </Form.Item>
                        <Form.Item name="Unit" label="Unit">
                            <Input placeholder='Enter Item Units' />
                        </Form.Item>
                        <Form.Item name="color" label="Product Color">
                            <Input placeholder='Enter Product Color' />
                        </Form.Item>
                        <Form.Item name="description" label="Product Description">
                            <Input.TextArea rows={3} placeholder='Enter Details' />
                        </Form.Item>
                        {/* <Form.Item name="discount" label="Discount">
                            <Input placeholder='Enter Discount' value={addForm.getFieldValue('mrp') / addForm.getFieldValue('sellingprice')} />
                        </Form.Item> */}
                        <Form.Item name="countryoforigin" label="Country of Origin">
                            <Input placeholder='Enter Country' />
                        </Form.Item>
                        <Form.Item name="manufacture" label="Manufacture">
                            <Input.TextArea rows={3} placeholder='Enter Manufacture Details' />
                        </Form.Item>
                        <Form.Item name="model" label="Product Model">
                            <Input placeholder='Enter Product Model' />
                        </Form.Item>

                        <Form.List
                            name="features"
                            initialValue={[
                                "Feature 1",

                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            initialValue={1}
                                            label={index === 0 ? 'Features' : ''}
                                            required={false}
                                            key={field.key}
                                            className="relative"
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input Features or  delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    placeholder="Features"
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <AiOutlineMinusCircle
                                                    size={25}
                                                    className="absolute left-[70%] top-[10%] cursor-pointer"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <button onClick={() => add()} className='px-5 py-2 text-white rounded shadow bg-gradient-to-l from-orange-400 to-orange-600'>
                                            Add More Features
                                        </button>

                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item name="brand" label="Product Brand">
                            <Input placeholder='Enter Product Brand' />
                        </Form.Item>
                        <Form.Item name="yearofrelease" label="Product Year of Release">
                            <Input placeholder='Enter Product Year of Release' />
                        </Form.Item>
                        <Form.Item name="warranty" label="Product Warranty">
                            <Input placeholder='Enter Product Warranty' />
                        </Form.Item>


                    </div>
                </Form>
            </section>
        </SellerLayout>
    )
}

export default EditProduct
