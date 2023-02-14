import React from 'react';
import { Link } from 'react-router-dom';

export const SideBarItems = ({ children }) => <section className='sidebar-main pt-[100px] w-[200px]' >{children}</section>
SideBarItems.Elem = ({ icon: Icon, label = "", href = "#!" }) => {

    return (
        <Link to={href} className="text-white font-semibold hover:text-purple-800 ">
                <div className='hover:bg-gray-200  duration-100' style={{ display: 'flex', alignItems: 'center',paddingLeft:'55px',fontSize:'medium',paddingTop:'10px',paddingBottom:'10px' }}>
                    <div>{Icon}</div>
                    <div style={{ marginLeft: '12px' }}>{label}</div>
                </div>      
        </Link>
    )
}