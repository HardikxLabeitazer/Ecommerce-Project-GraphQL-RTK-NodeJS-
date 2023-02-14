import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import auth from '../../app/auth/auth';
import {Link} from 'react-router-dom'
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import { ADD_NEW_SHOP } from '../../app/graphql/queries/mutations';
import { GET_SHOPS_BY_OWNER } from '../../app/graphql/queries/queries'
import graphQLQueries from '../../app/graphql/queries';

const Shops = () => {

    const { currentUser } = UserAuthFinal();
    const [shopData, setShopData] = useState([]);
    const  { data, error, loading } = useQuery(graphQLQueries.GET_SHOPS_BY_OWNER, {
        onCompleted(response) {
            setShopData(response.getShopsByOwner.data);
        }
    });
    const [addShop] = useMutation(ADD_NEW_SHOP, {
        onCompleted(response) {
            setShopData([...shopData, response.addNewShop.data])
        }
    })
    const [show, setShow] = useState(false);
    const [createForm] = Form.useForm();
    useEffect(() => {
        // if(currentUser._id){
        //     fetchShops();
        // }
        

    }, [currentUser?._id])

    const handleShopFinish = async values => {
        values.owner = currentUser._id;
        setShow(!show);
        createForm.resetFields();
        addShop({
            variables: {
                NewShopInput: values
            }
        })
        // fetchShops();

    }


    return (
        <section>
            <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#FCF5FC' }}>
                <p>
                    My Shops
                </p>
                <div>
                    <button onClick={() => setShow(!show)} style={{ marginRight: '30px' }}>
                        Create a New Shop
                    </button>
                </div>
            </div>
            <div style={{ paddingLeft: '30px' }}>
                {
                    shopData?.map((data, i) => {
                        return <Link key={i} to={"/user/myshops/"+data._id}><div style={{padding:'10px',color:'black',width:'50%',border:'1px solid gray',marginTop:'5px',marginBottom:'5px'}} key={i}>
                            <strong>{data.name}</strong><br/>
                            {data.description}

                        </div></Link>
                    })
                }
            </div>
            <Modal footer={false} width={500} height={700} title="Create New Shop" onCancel={() => setShow(!show)} open={show}>
                <Form form={createForm} onFinish={handleShopFinish} layout="vertical">
                    <Form.Item name="name" label="Shop Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Shop Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Shop Address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="shop_category" label="Shop Category">
                        <Input />
                    </Form.Item>
                    <button>Create</button>

                </Form>

            </Modal>
        </section>
    )
}

export default Shops