import logo from './logo.svg';
import './App.css';
import React, { Suspense,lazy } from 'react';
import 'antd/dist/antd.min.css'
import UserAuth from './customer/app/contextapi/UserContext';
import AdminAuth from './admin/contextapi/AdminContext';
import NavBar from './customer/pages/NavBar/NavBar'
import SellerAuth from './seller/app/providers/SellerContext';
// import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
const User = React.lazy(()=>import('./customer/pages/User/User'))
// import User from './customer/pages/User/User';


// const NavBar = React.lazy(()=>import('./customer/pages/NavBar/NavBar'));
const Login = React.lazy(()=>import('./customer/pages/Authorization/Login/Login'));
const SignUp = React.lazy(()=>import('./customer/pages/Authorization/SignUp/SignUp'));
const Shop = React.lazy(()=>import('./customer/pages/Shops/Shops'));
const Seller = React.lazy(()=>import('./customer/pages/Authorization/Seller/Seller'));
const SingleShop = React.lazy(()=>import('./customer/pages/Shops/SingleShop'));
const Home = React.lazy(()=>import('./customer/pages/Home/Home'));
const Product = React.lazy(()=>import('./customer/pages/Product/Product'));
const Cart = React.lazy(()=>import('./customer/pages/Cart/Cart'));
const Order = React.lazy(()=>import('./customer/pages/Orders/Order'));
const ShopOrders = React.lazy(()=>import('./customer/pages/Shops/ShopOrders'));
const CheckOut = lazy(()=>import('./customer/pages/CheckOut/CheckOut'))

// import Login from './customer/pages/Authorization/Login/Login'
// import SignUp from './customer/pages/Authorization/SignUp/SignUp';
// import Seller from './customer/pages/Authorization/Seller/Seller';
// import Shop from './customer/pages/Shops/Shops'
// import SingleShop from './customer/pages/Shops/SingleShop'
// import Home from './customer/pages/Home/Home';
// import Product from './customer/pages/Product/Product';
// import Cart from './customer/pages/Cart/Cart'
// import Order from './customer/pages/Orders/Order';
// import ShopOrders from './customer/pages/Shops/ShopOrders';



const DashBoard = React.lazy(()=>import('./admin/pages/dashboard/index'));
const ProductsAdmin = React.lazy(()=>import('./admin/pages/products'));
const UsersAdmin = React.lazy(()=>import('./admin/pages/users'));
const SellersAdmin = React.lazy(()=>import('./admin/pages/sellers'));
const ShopsAdmin = React.lazy(()=>import('./admin/pages/shops/index'));
const OrdersAdmin = React.lazy(()=>import('./admin/pages/orders'));
const AdminLogin = React.lazy(()=>import('./admin/pages/loginpage'));
// const DashBoard = React.lazy(()=>import('./admin/pages/dashboard/index'));

// import DashBoard from './admin/pages/dashboard/index';
// import ProductsAdmin from './admin/pages/products';
// import UsersAdmin from './admin/pages/users';
// import SellersAdmin from './admin/pages/sellers';
// import ShopsAdmin from './admin/pages/shops';
// import OrdersAdmin from './admin/pages/orders';
// import AdminLogin from './admin/pages/loginpage';


const HomeSeller = React.lazy(()=>import('./seller/pages/dashboardPage'));
const SellerLogin = React.lazy(()=>import('./seller/pages/loginPage'));
const SellerOrders = React.lazy(()=>import('./seller/pages/orders'));
const SellerListings = React.lazy(()=>import('./seller/pages/Listings'));

// import HomeSeller from './seller/pages/dashboardPage';
// import SellerLogin from './seller/pages/loginPage';
// import SellerOrders from './seller/pages/orders';

// import SellerListings from './seller/pages/Listings';


function App() {



  return (
    <div className="">

      <BrowserRouter>
          <Suspense fallback={<p className='text-5xl'>Loading...</p>}>
            <Routes>
            {/* <UserAuth>
          <NavBar> */}
              <Route exact path="/login" element={<UserAuth><NavBar children={<Login />}/></UserAuth>} />
              <Route exact path="/" element={<UserAuth><NavBar children={<Home />}/></UserAuth>} />
              <Route exact path="/user" element={<UserAuth><NavBar children={<User />}/></UserAuth>} />
              <Route exact path="/user/orders" element={<UserAuth children={<NavBar children={<Order />}/>}/>} />
              <Route exact path="/signup" element={<UserAuth children={<NavBar children={<SignUp />}/>}/>} />
              <Route exact path="/seller" element={<UserAuth children={<NavBar children={<Seller />}/>}/>} />
              <Route exact path="/user/myshops" element={<UserAuth children={<NavBar children={<Shop />}/>}/>} />
              <Route exact path="/user/myshops/:shopId" element={<UserAuth children={<NavBar children={<SingleShop />}/>}/>} />
              <Route exact path="/user/myshops/:shopId/orders" element={<UserAuth children={<NavBar children={<ShopOrders />}/>}/>} />
              <Route exact path="/product/:productId" element={<UserAuth children={<NavBar children={<Product />}/>}/>} />
              <Route exact path="/cart" element={<UserAuth children={<NavBar children={<Cart />}/>}/>} />
              <Route exact path="/checkout" element={<UserAuth children={<NavBar children={<CheckOut />}/>}/>} />

              //Seller Routes
              <Route path='/seller'>
                <Route index element={<SellerAuth children={<HomeSeller/>}/>}/>
                <Route path='login' element={<SellerLogin/>}/>
                <Route path="orders" element={<SellerAuth children={<SellerOrders/>}/>}/>
                <Route path='listings' element={<SellerAuth children={<SellerListings/>}/>}/>
              </Route>

              ///Admin Routes
              <Route  path="/admin"  >
                <Route index element={<AdminAuth children={<DashBoard/>}/>}/>
                <Route path="products"  element={<AdminAuth children={<ProductsAdmin/>}/>}/>
                <Route path="users" element={<AdminAuth children={<UsersAdmin/>}/>}/>
                <Route path="sellers" element={<AdminAuth children={<SellersAdmin/>}/>}/>
                <Route path='shops' element={<AdminAuth children={<ShopsAdmin/>}/>}/>
                <Route path='orders' element={<AdminAuth children={<OrdersAdmin/>}/>}/>
                <Route path='login' element={<AdminAuth children={<AdminLogin/>}/>}/>
              </Route>

            </Routes>
            </Suspense>
      </BrowserRouter>


    </div>
  );
}

export default App;
