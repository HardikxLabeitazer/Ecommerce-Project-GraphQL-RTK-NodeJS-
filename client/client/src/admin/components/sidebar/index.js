import React, { Fragment } from 'react';
import  {  SideBarItems } from './SideBarItems';
import {FiBox, FiHome} from 'react-icons/fi';
import {GiShoppingBag} from 'react-icons/gi'

const SideBar = () => {
  return (
    <Fragment>
        <section className='h-full z-50 shadow fixed top-0 left-0 bottom-0 w-[200px] bg-[#3c0070] text-white'>
            <div className='py-4 text-2xl text-white font-semibold text-center'>
                <h2 className='text-white'>Admin</h2>
            </div>
            <SideBarItems.Elem label='Home' icon={<FiHome/>} href="/admin"/>
            <SideBarItems.Elem label='Products' icon={<GiShoppingBag/>} href="/admin/products"/>
            <SideBarItems.Elem label='Users' icon={<FiHome/>} href="/admin/users"/>
            <SideBarItems.Elem label='Sellers' icon={<FiHome/>} href="/admin/sellers"/>
            <SideBarItems.Elem label='Shops' icon={<FiHome/>} href="/admin/shops"/>
            <SideBarItems.Elem label='Orders' icon={<FiHome/>} href="/admin/orders"/>
            <SideBarItems.Elem label='Settings' icon={<FiHome/>} href="/admin/settings"/>
            
        </section>
    </Fragment>
  )
}

export default SideBar