import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import auth from '../../app/auth/auth'
import { UserAuthFinal } from '../../app/contextapi/UserContext'
import cartHelp from '../../app/cart/cartHelp'
import './style.css'
import Search from 'antd/lib/input/Search'
import { Input } from 'antd'
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa'

const NavBar = ({ children }) => {

    const { logout, currentUser, currentCart } = UserAuthFinal();
    const [cartCount, setCartCount] = useState('');
    const handlelogout = () => {
        logout()
    }
    useEffect(() => {
        if (currentCart) {
            setCartCount(currentCart?.products?.length)
        }

    }, [currentCart?.products?.length])

    return (<>
        
        <nav className='h-[60px] shadow w-full text-white flex justify-between px-8 items-center bg-purple-500 fixed z-50 top-0 right-0 left-0'>
            <div className='flex gap-[10px] w-1/2 ml-20 items-center'>
                <Link to="/" className='text-white hover:text-white'>
                    <p className='text-2xl font-bold mt-4'>COme2Buy</p>
                </Link>
                <Input placeholder='Search for products,brands and more' suffix={<AiOutlineSearch size={22} className="text-gray-400" />} className='w-1/2 h-[40px]  ' style={{ padding: '4px', paddingLeft: '20px', font: 'status-bar', fontSize: 'medium' }} />
            </div>
            <div className='w-1/3 px-10 justify-between flex items-center '>
                <div >
                    <FaUser className='cursor-pointer' size={25} />
                </div>
                <Link to={"/cart"} className="text-white hover:text-white">
                    <div className='flex relative items-center cursor-pointer gap-[5px]'>
                        <BsCartFill size={24} />
                        <p className='mt-4 font-semibold text-[17px] '>Cart</p>
                        <p hidden={cartCount==0} className='w-4 h-4 text-center text-xs right-8 top-2 absolute bg-red-400 rounded-full'>{cartCount || ''}</p>
                    </div>
                </Link>
            </div>
        </nav>
        <div style={{ paddingTop: '60px' }}>
            {children}

        </div>
    </>
    )
}

export default NavBar