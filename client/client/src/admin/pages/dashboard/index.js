import React from 'react'
import { AdminAuthFinal } from '../../contextapi/AdminContext'
import AdminLayout from '../../layouts/AdminLayout'

const DashBoard = () => {

  const {currentUser} = AdminAuthFinal();

  return (
    <AdminLayout>
        <div>
          Hello
            
            {currentUser?.name}
            
        </div>
    </AdminLayout>
  )
}

export default DashBoard