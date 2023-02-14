import React, { Fragment, useEffect } from 'react'
import { useGetAdminDetailsQuery } from '../app/store/slices/usersApiSlice'
import SideBar from '../components/sidebar'
// import { AdminAuthFinal } from '../contextapi/AdminContext'

const AdminLayout = ({children}) => {
  
  let userDetails = useGetAdminDetailsQuery();
  // useEffect(()=>{
    
  // },[])


  return (
    <Fragment>
        <nav className='ml-[200px] w-full z-50 bg-white shadow h-[60px] fixed'>
          
           
        </nav>
        <SideBar/>
        <div style={{paddingTop:'60px',paddingLeft:'200px'}}>
            {children}
        </div>
    </Fragment>
  )
}

export default AdminLayout