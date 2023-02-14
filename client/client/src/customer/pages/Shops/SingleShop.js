import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Form, Input, Modal, Switch, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import auth from '../../app/auth/auth';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import graphQLQueries from '../../app/graphql/queries';
import { imageUpload, imageUploadMultiple } from '../../app/imageUpload/imageUpload';

const SingleShop = () => {

    const { currentUser } = UserAuthFinal();
    const params = useParams();
    const navigate = useNavigate();
    const [variableData, setVariableData] = useState("");
    const [shopUpdateForm] = Form.useForm();
    const [productForm] = Form.useForm();
    const [editForm] =Form.useForm();
    
    const [showProd, setShowProd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [productData, setProductData] = useState([]);
    const [showEdit,setShowEdit] = useState(false);
    const [imageLink,setImageLink] = useState('');

    const [deleteShop] = useMutation(graphQLQueries.DELETE_SHOP_BY_ID, {
        variables: {
            _id: params.shopId
        },
        onCompleted(data) {
            console.log(data);
            navigate('/user/myshops')

        }
    })

    const { } = useQuery(graphQLQueries.GET_SHOP_BY_ID, {
        variables: {
            _id: params.shopId
        },
        onCompleted(data) {
            setShopData(data.getShopByID.data);

        }
    });

    const { refetch} = useQuery(graphQLQueries.GET_ALL_PRODUCTS_BY_SHOP, {
        variables: {
            _id: params.shopId
        },
        onCompleted(data) {
            setProductData(data.getAllProductsByShop.data);
        }
    })

    const [UpdateShop] = useMutation(graphQLQueries.UPDATE_SHOP_BY_ID, {
        onCompleted(response) {
            setShopData([...shopData, response.UpdateShopByID.data]);
            shopUpdateForm.resetFields();
            setShowUpdate(!showUpdate);
        }
    })


    const [addProduct] = useMutation(graphQLQueries.ADD_NEW_PRODUCT, {

        onCompleted(data) {
            productForm.resetFields();
            if(productData.length>0){
                setProductData([...productData,data.addNewProduct.data]);
            }else{
                setProductData(data.addNewProduct.data);
            }
            
            console.log(productData)
        }
    })

    const [updateProduct] = useMutation(graphQLQueries.UPDATE_PRODUCT_BY_ID,{
        onCompleted(data){
            editForm.resetFields();
            console.log(data);
        }
    })

    const [deleteProduct] = useMutation(graphQLQueries.DELETE_PRODUCT_BY_ID,{
        onCompleted(data){
            refetch();
        }
    })

    const [statusChange] = useMutation(graphQLQueries.UPDATE_PRODUCT_STATUS,{
        onCompleted(data){
            setShopData(shopData)
            // refetch();
        }
    })

    // useEffect(()=>{

    // },[])



    const [shopData, setShopData] = useState([]);


    const handleShopUpdate = (values) => {
        values._id = shopData._id
        UpdateShop({
            variables: {
                UpdateShopInput: values
            }
        })
    }

    const handleAddProduct = (values) => {
        values.images = imageLink || '';
        values.owner = currentUser?._id;
        values.shop = params.shopId;
        values.mrp = +values.mrp;
        values.sellingprice = +values.sellingprice;
        values.quantity = +values.quantity;
        addProduct({
            variables: {
                NewProductInput: values
            }
        })
   

    }

    const handleUpdateProduct=(values)=>{
        values.owner = currentUser?._id;
        values.shop = params.shopId;
        values.mrp = +values.mrp;
        values.sellingprice = +values.sellingprice;
        values.quantity = +values.quantity;
        
        updateProduct({
            variables:{
                UpdateProductInput:values
            }
        })
    }

    const handleStatusChange = (_id,status) =>{
      
        statusChange({
            variables:{
                _id,
                active:status
            }
        })
    }

    const handleImageChange =async e =>{
        const file = e.target.files;
        if(!file[0]) return ;
       
        const response = await imageUploadMultiple(file);
        setImageLink(response.data || '')
       
    }


    

    return (
        <section>
            <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#FCF5FC' }}>
                <p style={{ fontSize: 'x-large', fontWeight: '600' }}>
                    {shopData.name}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button onClick={() => setShowProd(!showProd)} style={{ marginRight: '30px' }}>
                        Add Products
                    </button>
                    <button onClick={() => navigate('/user/myshops/'+params.shopId+'/orders')} style={{ marginRight: '30px' }}>
                        Shop Orders
                    </button>
                    <button onClick={() => { shopUpdateForm.setFieldsValue({ ...shopData }); setShowUpdate(!showUpdate); }} style={{ marginRight: '30px' }}>
                        Edit Shop
                    </button>
                    <button onClick={() => deleteShop()} style={{ marginRight: '30px' }}>
                        Delete Shop
                    </button>
                </div>
            </div>
            <div style={{ padding: '5px', marginTop: '10px', display: 'grid' }}>

                {
                    productData?.map((data,i) => {
                      return  <div key={i} style={{ width: '30%', height: '260px', border: '1px solid gray', padding: '10px' }}>
                           {
                            data.images?.map((img,k)=> <img key={k} src={img?img:''} width={100} height={100}/>)
                           }
                            <p style={{ fontSize: 'medium' }}>{data.name}</p>
                            <p>{data.sellingprice}Rs</p>
                            <p style={{ color: 'gray' }}>{data.description}</p>
                            <div style={{display:'flex',justifyContent:'space-evenly'}}>
                                <button onClick={()=>{editForm.setFieldsValue({...data});setShowEdit(!showEdit);}}>Edit</button>
                                <button onClick={()=>{deleteProduct({variables:{_id:data._id}}) }}>Delete</button>
                                <Switch onChange={(status)=>handleStatusChange(data._id,status)} checked={data.active}/>
                            </div>

                        </div>
                    })
                }


            </div>
            <Modal footer={false} width={500} height={700} title="Create New Shop" onCancel={() => setShowUpdate(!showUpdate)} open={showUpdate}>
                <Form form={shopUpdateForm} onFinish={handleShopUpdate} layout="vertical">
                    <Form.Item name="name" label="Shop Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Shop Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="address" label="Shop Address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="shop_category" label="Shop Category">
                        <Input />
                    </Form.Item>
                    <Form.Item name="default_discount" label="Default discount">
                        <Input />
                    </Form.Item>


                    <button>Update</button>

                </Form>

            </Modal>
            <Modal footer={false} width={600} height={700} title="Add New Product" onCancel={() => setShowProd(!showProd)} open={showProd}>
                <Form form={productForm} onFinish={handleAddProduct} layout="vertical">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item  label="Image">
                        <input multiple type="file" onChange={handleImageChange}/>
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Input />
                    </Form.Item>
                    <Form.Item name="weight" label="Weight">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Unit" label="Unit">
                        <Input />
                    </Form.Item>
                    <Form.Item name="mrp" label="MRP">
                        <Input />
                    </Form.Item>
                    <Form.Item name="sellingprice" label="Selling Price">
                        <Input />
                    </Form.Item>
                    <Form.Item name="manufacture" label="Manufacture">
                        <Input />
                    </Form.Item>
                    <Form.Item name="model" label="Model">
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity">
                        <Input />
                    </Form.Item>


                    <button>Update</button>

                </Form>

            </Modal>
            <Modal footer={false} width={600} height={700} title="Update Product" onCancel={() => setShowEdit(!showEdit)} open={showEdit}>
                <Form form={editForm} onFinish={handleUpdateProduct} layout="vertical">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="_id" hidden></Form.Item>
                    
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Input />
                    </Form.Item>
                    <Form.Item name="weight" label="Weight">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Unit" label="Unit">
                        <Input />
                    </Form.Item>
                    <Form.Item name="mrp" label="MRP">
                        <Input />
                    </Form.Item>
                    <Form.Item name="sellingprice" label="Selling Price">
                        <Input />
                    </Form.Item>
                    <Form.Item name="manufacture" label="Manufacture">
                        <Input />
                    </Form.Item>
                    <Form.Item name="model" label="Model">
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity">
                        <Input />
                    </Form.Item>


                    <button>Update</button>

                </Form>

            </Modal>
        </section>
    )
}

export default SingleShop