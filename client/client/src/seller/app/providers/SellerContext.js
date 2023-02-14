import { useNavigate } from "react-router";
import { createContext, useContext, useState, useEffect, Fragment, Suspense } from "react";
import authSeller from '../../helpers/auth'

const SellerAuthContext = createContext({});

const SellerAuth = ({ children }) => {
    const { verify, logout, loggedIn, updateData, currentShop, changeShop } = UserProviderAuth();

    useEffect(() => {
        if (authSeller.isAuthenticated() == false) {
            verify();
        }
    }, [])

    return (
        <SellerAuthContext.Provider value={{ verify, logout, currentShop, loggedIn, updateData, changeShop }}>
            <Suspense>
                {children}
            </Suspense>
        </SellerAuthContext.Provider>
    )
}

export default SellerAuth;

export const SellerAuthFinal = () => {
    return useContext(SellerAuthContext)
}


const UserProviderAuth = () => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [currentShop, setCurrentShop] = useState([]);
    // const [currentCart,setCurrentCart] = useState(cartHelp.getCart());

    useEffect(() => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authSeller?.isAuthenticated()
            },
            body: JSON.stringify({
                query: `
                query{
                    getShopsByOwner{
                      error
                      message
                      data{
                        _id
                        name
                        description
                        default_discount
                        shop_category
                        address
                          owner{
                          _id
                          name
                        }
                        ratings
                        created
                      }
                    }
                  }
                `
            })
        }).then(res => res.json())
            .then(data => {
                let LShop = localStorage.getItem('last_shop');
                if (LShop) {
                    let temp = data.data.getShopsByOwner?.data?.find(data => data._id == LShop);
                    setCurrentShop(temp);
                } else {
                    setCurrentShop(data.data.getShopsByOwner?.data[0]);
                    localStorage.setItem('last_shop', data.data.getShopsByOwner?.data[0]._id)
                }

            })
    }, [authSeller.isAuthenticated()])

    const navigate = useNavigate();


    const updateData = () => {
        setIsUpdated(true);
    }

    const loggedIn = () => {
        if (authSeller.isAuthenticated() !== false) {
            return true;
        }
        return false;
    }

    const changeShop = async (id) => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authSeller?.isAuthenticated()
            },
            body: JSON.stringify({
                query: `
                query{
                    getShopsByOwner{
                      error
                      message
                      data{
                        _id
                        name
                        description
                        default_discount
                        shop_category
                        address
                          owner{
                          _id
                          name
                        }
                        ratings
                        created
                      }
                    }
                  }
                `
            })
        }).then(res => res.json())
            .then(data => {
                if (id) {
                    let temp = data.data.getShopsByOwner?.data?.find(data => data._id == id);
                    localStorage.setItem('last_shop', temp._id);
                    setCurrentShop(temp);
                }
                else {

                    let LShop = localStorage.getItem('last_shop');
                    if (LShop) {
                        let temp = data.data.getShopsByOwner?.data?.find(data => data._id == LShop);
                        setCurrentShop(temp);
                    } else {
                        setCurrentShop(data.data.getShopsByOwner?.data[0]);
                        localStorage.setItem('last_shop', data.data.getShopsByOwner?.data[0]._id)
                    }


                }

            }

            )
    }

    const verify = () => {

        if (authSeller.isAuthenticated() !== false) {
            navigate('/seller');
        } else {
            navigate('/seller/login');
        }
    }

    const logout = () => {
        authSeller.clearJWT(() => {

        })

        navigate('/seller/login')
    }
    // const cartUpdate = ()=>{
    //    setCurrentCart(cartHelp.getCart());
    // }
    return {
        verify, logout, loggedIn, updateData, currentShop, setCurrentShop, changeShop
    }
}

