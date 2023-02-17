import { useQuery } from '@apollo/client'
import React, { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../app/contextapi/UserContext.js';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import graphQLQueries from '../../app/graphql/queries/index.js';

const Home = () => {

  const [productData, setProductData] = useState([]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const { currentCart } = UserAuthFinal();

  let homepageData = useQuery(graphQLQueries.GET_ALL_PRODUCTS, {
    onCompleted(data) {
      setProductData(data.getAllProducts.data);
    }
  });

  useEffect(() => {
    if (!productData?.length > 0) {
      homepageData?.refetch();
    }

    window.onscroll = () => {

      if (window.scrollY <= 200) {

        setScrollEffect(false);
      } else if (window.scrollY > 200) {
        setScrollEffect(true)
      }
    }


  }, [homepageData.loading])

  const CategoryBox = ({ name, img,scrollEffect }) => {
    return (
      <div className='cursor-pointer relative'>
        <img hidden={scrollEffect==true} src={img} className='w-[70px] h-[65px] mt-5' />
       <p className={`hover:text-gray-400 font-semibold text-center ${scrollEffect?'mt-3':''}`}>{name}</p>
     
      </div>
    )
  }

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <section id="category-bar" className={`w-full justify-evenly flex items-center px-28 bg-white shadow-sm ${scrollEffect ? 'h-[50px] duration-300' : ' h-[140px] duration-300'} top-[60px] shadow fixed`}>
        <CategoryBox scrollEffect={scrollEffect} name="Grocery" img={"https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Mobiles" img={"https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Fashions" img={"https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Electronics" img={"https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Home" img={"https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Appliances" img={"https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Beauty , Toys" img={"https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100"}/>
        <CategoryBox scrollEffect={scrollEffect} name="Offers" img={"https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100"}/>
       
      </section>
      
      <section>
        <div className='mt-20 p-5'>
          <p className='text-xl font-semibold '>Products</p>
          <div className='flex flex-wrap gap-[50px]'>
            {

              productData?.map((data, i) => {
                return <Link key={i} className='text-black hover:text-black' to={"/product/" + data?._id}>
                  <div className='w-[250px] h-[330px] border border-gray-100  hover:shadow-lg'>
                    <div className='flex border-b border-gray-100 justify-center h-[185px] w-full bg-white'>
                      <img src={data?.images ? data.images[0] : ''} className="w-[200px] h-[185px]" />
                    </div>
                    <div className='text-md space-y-2 mt-3 flex flex-col mx-5'>
                      <span className='text-gray-600 font-semibold'>{data?.name?.charAt(0).toUpperCase() + data?.name?.substring(1)}</span>
                      <span className='font-semibold text-[16px]'>₹{data?.sellingprice}</span>
                      <span className='text-green-500 font-semibold'>Free Delivery</span>
                    </div>


                  </div>
                </Link>
              })
            }
          </div>
        </div>
      </section>
    </Suspense>
  )
}

export default Home