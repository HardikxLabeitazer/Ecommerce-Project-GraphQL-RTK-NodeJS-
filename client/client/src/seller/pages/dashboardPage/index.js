import React, { Fragment } from 'react'
import { SellerAuthFinal } from '../../app/providers/SellerContext'
import SellerLayout from '../../layouts/SellerLayout'

const HomeSeller = () => {

  const {currentShop} = SellerAuthFinal();

  return (
    <SellerLayout>
        I am the seller
        {currentShop?.name}
        {console.log(currentShop)}
    </SellerLayout>
  )
}

export default HomeSeller