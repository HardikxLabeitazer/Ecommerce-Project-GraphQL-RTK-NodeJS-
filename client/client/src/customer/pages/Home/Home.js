import { useQuery } from '@apollo/client'
import React, { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import graphQLQueries from '../../app/graphql/queries/index.js';

const Home = () => {

  const [productData, setProductData] = useState([]);


  let homepageData = useQuery(graphQLQueries.GET_ALL_PRODUCTS, {
    onCompleted(data) {
      setProductData(data.getAllProducts.data);
    }
  });

  useEffect(() => {
    if (!productData?.length > 0) {
      homepageData?.refetch();
    }
  }, [homepageData.loading])

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <section>
        <div style={{ marginTop: '10px', width: '100%', padding: '30px' }}>
          <p className='text-xl font-semibold '>Products</p>
          <div className='flex flex-wrap gap-[50px]'>
            {
              // productData?.map((data, i) => {
              //   return <Link key={i} to={"/product/"+data._id}><div key={i} style={{display:'flex',color:'black', width: '30%', height: '160px', border: '1px solid gray', padding: '10px',marginTop:'5px' }}>
              //       <img src={data.images[0]?data.images[0]:''} width={100} height={100}/>
              //     <p style={{ fontSize: 'medium' }}>{data.name}</p>
              //     <p>{data.sellingprice}Rs</p>
              //     <p style={{ color: 'gray' }}>{data.description}</p>
              //   </div></Link>
              // })

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