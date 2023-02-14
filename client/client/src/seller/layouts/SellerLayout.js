import React, { Fragment, useEffect, useMemo } from 'react'
import { FiBox } from 'react-icons/fi'
import { SellerAuthFinal } from '../app/providers/SellerContext'
import NavBar from '../components/navbar'
import { Sidebar } from '../components/sidebar'

const SellerLayout = ({children}) => {

  const {changeShop,currentShop} = SellerAuthFinal();
  useMemo(()=>{
    if(!currentShop._id){
      changeShop();
    }
  },[])

  return (
    <Fragment>
        <NavBar/>
        <Sidebar>
            <p className='text-2xl text-center text-white font-semibold py-5'>Seller</p>
            <Sidebar.Child name="Home" icon={<FiBox size={25}/>} href="/seller"/> 
            <Sidebar.Child name="Listings" icon={<FiBox size={25}/>} href="/seller/listings"/>
            <Sidebar.Child name="Inventory" icon={<FiBox size={25}/>} href="/seller/products"/>
            <Sidebar.Child name="Orders" icon={<FiBox size={25}/>} href="/seller/orders"/> 
            <Sidebar.Child name="Payments" icon={<FiBox size={25}/>} href="/seller/reviews"/>
            <Sidebar.Child name="Promotions" icon={<FiBox size={25}/>} href="/seller/reviews"/>
            <Sidebar.Child name="Analytics" icon={<FiBox size={25}/>} href="/seller/reviews"/>
            <Sidebar.Child name="Services" icon={<FiBox size={25}/>} href="/seller/reviews"/>
        </Sidebar>
        
        <section className='pt-[60px] ml-[220px]'>
            {children}
        </section>
    </Fragment>
  )
}

export default SellerLayout