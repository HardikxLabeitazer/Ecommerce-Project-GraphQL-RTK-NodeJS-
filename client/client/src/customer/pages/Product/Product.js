import { useMutation, useQuery } from '@apollo/client';
import React, { Fragment, Suspense, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import cartHelp from '../../app/cart/cartHelp';
import graphQLQueries from '../../app/graphql/queries';
import { UserAuthFinal } from '../../app/contextapi/UserContext';
import { imageUpload } from '../../app/imageUpload/imageUpload';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdLocalOffer, MdPin, MdPinDrop } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi';
import { Input, Rate } from 'antd'

const Product = () => {
    const params = useParams();
    const { cartUpdate, currentUser ,setCurrentBuyProduct,currentCart,refreshCart} = UserAuthFinal();
     const navigate = useNavigate();
    const [product,setProduct] = useState([])
    let initialProductPageState = {
        pincode: '',
        reviewText: '',
        ratingStar: 1,
        reviewTitle: '',
        products: []
    }




    const [productPageState, setProductPageState] = useReducer(productPageReducer, initialProductPageState);

    let { pincode, reviewText, ratingStar, reviewTitle, products } = productPageState;

    const singleProductData = useQuery(graphQLQueries.GET_PRODUCT_BY_ID, {
        variables: {
            _id: params.productId
        },
        onCompleted(data) {

            // setProductPageState({ type: 'SET_PRODUCT', payload: data.getProductByID.data });
            setProduct(data.getProductByID.data)
        }
    });

    const [addReviewAndRating] = useMutation(graphQLQueries.ADD_RATING_AND_REVIEW,{
        onCompleted(){
            singleProductData.refetch();
            setProductPageState({type:'RESET'})
        }
    });

    const [updateCart] = useMutation(graphQLQueries.UPDATE_CART_BY_USER,{
        onCompleted(data){
           
            if(data.updateCartByUser.error==false){
                refreshCart()
            }
            
            
        },
        refetchQueries:[
            {
                query:graphQLQueries.GET_PRODUCT_BY_ID,variables:{_id:params.productId}
            }
        ]
    })



    // const handleAddCart = () => {
    //     cartHelp.addToCart(product, () => { });
    //     // cartUpdate();
    // }

    // const handleFileChange = async e => {
    //     const file = e.target.files;
    //     if (!file[0]) return;
    //     console.log(file[0])
    //     const response = await imageUpload(file);
    //     console.log('final', response);
    // }

    const handleReviewAndRating = () => {
        addReviewAndRating({
            variables: {
                RatingReviewInput: {
                    title: reviewTitle,
                    description: reviewText,
                    userID: currentUser?._id,
                    ratings: ratingStar,
                    _id: product._id

                }
            }
        })

    }
    const handleBuyNow = ()=>{
        setCurrentBuyProduct([{
            product:product,
            quantity:1,
            shop:product?.shop?._id,
            price:product?.sellingprice,
            total_amount:product?.sellingprice
        }])
        navigate('/checkout');
    }

    const handleProductInfo = ()=>{
        let data = {
            name:product.name,
            _id:product._id,
            mrp:product.mrp,
            sellingprice:product.sellingprice,
            shop:product.shop,
            images:product.images
        }
        return data;
    }

    return (

        <Fragment>
            <Suspense fallback={<p>Loading...</p>}>
                <section className='w-full'>
                    <section className='w-11/12 mx-5 lg:mx-20'>
                        <div className='fixed w-1/3  top-[60px] left-20 bottom-0'>
                            <div className='flex w-full mt-5 '>
                                <div className='w-[100px] h-[300px] '>
                                    list
                                </div>
                                <div className='w-full border border-gray-50'>
                                    <img src={product?.images ? product?.images[0] : ''} className='w-100 h-[470px] ' />
                                </div>

                            </div>
                            <div className='flex justify-center space-x-8 mt-8'>
                                <button onClick={()=>{ updateCart({variables:{
                                    cart_id:currentCart._id,
                                    product:product._id,
                                    quantity:1
                                }});}} className='py-4 w-[200px] bg-purple-500 text-[16px] rounded-sm shadow hover:bg-purple-600 text-white font-bold'>ADD TO CART</button>
                                <button onClick={handleBuyNow} className='py-4 w-[200px] bg-purple-500 text-[16px] rounded-sm shadow hover:bg-purple-600 text-white font-bold'>BUY NOW</button>
                            </div>

                        </div>
                        <div className='ml-[38.0%] '>
                            <p className='mt-5 text-2xl font-semibold'>{product?.name}</p>
                            <span className='flex items-center space-x-2'>
                                <p className='flex  items-center pl-[5px] text-[11px] rounded bg-green-500  w-[30px] text-white'>{product?.ratings || 1} <AiFillStar /></p>
                                <p className='text-[13px] text-gray-500 font-semibold'>800 Ratings and 200 Reviews</p>

                            </span>
                            <span className='flex space-x-3 '>
                                <p className='text-3xl font-semibold'>₹{product.sellingprice}</p>
                                <strike className="mt-1 text-lg">₹{product.mrp}</strike>
                            </span>
                            <span>
                                <p className='text-lg font-semibold'>Available Offers</p>
                                <ul>
                                    <li className='flex items-center space-x-3'><MdLocalOffer color='green' /><strong>Bank Offer</strong><span className='my-1'>10% off on Kotak Bank Credit Cards and Credit EMI Trxns, up to ₹1,500. On orders of ₹5,000 and above</span></li>
                                    <li className='flex items-center space-x-3'><MdLocalOffer color='green' /><strong>Bank Offer</strong><span className='my-1'>10% off on Kotak Bank Credit Cards and Credit EMI Trxns, up to ₹1,500. On orders of ₹5,000 and above</span></li>
                                    <li className='flex items-center space-x-3'><MdLocalOffer color='green' /><strong>Bank Offer</strong><span className='my-1'>10% off on Kotak Bank Credit Cards and Credit EMI Trxns, up to ₹1,500. On orders of ₹5,000 and above</span></li>
                                </ul>
                            </span>
                            <div className='flex font-semibold mt-20 items-center gap-[100px]'>
                                <span className='text-gray-400 '>Warranty</span>
                                <span>{product.warranty || '1 Year warranty'}</span>
                            </div>
                            <div className='flex gap-[100px] mt-10'>
                                <span className='text-gray-400 font-semibold'>Delivery</span>
                                <input type={"text"} placeholder="Enter Delivery Pincode" className="border-b-2 focus:border-blue-500 w-[250px] outline-none" prefix={<FiMapPin size={25} />} />
                                <button className='border outline-none py-1 px-5 bg-yellow-500 hover:bg-yellow-600 rounded-sm text-white font-semibold shadow'>Check</button>
                            </div>
                            <div className='mt-10 flex  gap-[100px]'>
                                <span className='text-gray-400 font-semibold'>Highlights</span>
                                <ul className='marker:text-gray-300 list-outside space-y-2 list-disc '>
                                    <li className=''>lsjljf sdl lore m dlfjljflj</li>
                                    <li>lsjljf sdl lore m dlfjljflj</li>
                                    <li>lsjljf sdl lore m dlfjljflj</li>
                                    <li>lsjljf sdl lore m dlfjljflj</li>
                                </ul>
                            </div>
                            <div className='mt-10 flex gap-[100px]'>
                                <span className='text-gray-400 font-semibold'>Seller</span>
                                <p className='text-green-500 font-semibold'>{product?.shop?.name || 'Unknown'}</p>
                            </div>
                            <div className='mt-10 flex gap-[100px]'>
                                <span className='text-gray-400 font-semibold'>Description</span>
                                <p className='text-green-500 font-semibold h-[50vh] border w-full p-3'>{product?.description || 'Unknown'}</p>
                            </div>
                            <span className='text-gray-400 mt-10 text-2xl font-semibold'>Specifications</span>
                            <div className='mt-2 mx-5'>
                                <ul className='list-item space-y-2 list-disc marker:text-gray-300'>
                                    <li>ljljldjf alkjfk kalie ijfijfljlfjldsjlfjslfjslkfj</li>
                                    <li>ljljldjf alkjfk kalie ijfijfljlfjldsjlfjslfjslkfj</li>
                                    <li>ljljldjf alkjfk kalie ijfijfljlfjldsjlfjslfjslkfj</li>
                                    <li>ljljldjf alkjfk kalie ijfijfljlfjldsjlfjslfjslkfj</li>
                                    <li>ljljldjf alkjfk kalie ijfijfljlfjldsjlfjslfjslkfj</li>
                                </ul>
                            </div>
                            <p className='mt-10 text-3xl text-gray-600'>Ratings & Reviews</p>

                            <div className=''>

                                <div className='space-y-3'>
                                    <Input placeholder='Title' style={{ padding: '6px' }} value={reviewTitle} onChange={(e) => setProductPageState({ type: 'SET_TITLE', payload: e.target.value })} />
                                    <Input.TextArea value={reviewText} onChange={(e) => setProductPageState({ type: 'SET_REVIEW', payload: e.target.value })} rows="8" />
                                    <div className='flex space-x-3 items-center'>
                                        <button onClick={handleReviewAndRating} className='py-3 my-2 font-semibold px-6 bg-orange-500 text-white hover:bg-orange-600 rounded shadow'>Submit</button>
                                        <Rate value={ratingStar} onChange={(value) => setProductPageState({ type: 'SET_RATING', payload: value })} />
                                    </div>
                                </div>
                                <span className='flex mt-5 space-x-3 h-[50px] '>
                                    <p className='text-4xl'>4.5</p>
                                    <AiFillStar size={30} className="mt-2" />
                                </span>
                            </div>

                            <h3 className='pb-10'>754 Ratings &  <br /> 50 Reviews</h3>

                            <div className='mt-5 '>

                                {
                                    product?.review?.map((data, i) => {
                                        return <>
                                            <div className='flex space-x-3 items-center'>
                                                <p className='flex  items-center pl-[5px] h-[20px] text-[11px] rounded bg-green-500  w-[30px] text-white'>{data.rating} <AiFillStar /></p>
                                                <p>{data.title}</p>
                                            </div>
                                            <p>{data.description}</p>
                                        </>
                                    })
                                }

                            </div>


                        </div>
                    </section>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default Product


const productPageReducer = (state, action) => {

    switch (action.type) {

        case 'SET_PINCODE':
            return {
                ...state,
                pincode: action.payload
            }
        case 'SET_REVIEW':
            return {
                ...state,
                reviewText: action.payload
            }
        case 'SET_RATING':
            return {
                ...state,
                ratingStar: action.payload
            }
        case 'SET_TITLE':
            return {
                ...state,
                reviewTitle: action.payload
            }
        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload
            }

        case 'RESET':
            return {
                ...state,
                ratingStar:1,
                reviewText:'',
                reviewTitle:''
            }

        default:
            return state;
    }
}