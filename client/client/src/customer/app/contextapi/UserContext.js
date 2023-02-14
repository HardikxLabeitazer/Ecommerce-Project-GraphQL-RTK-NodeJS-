import { useNavigate } from "react-router";
import auth from "../auth/auth";

import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql/queries/queries";
import cartHelp from "../cart/cartHelp";


const UserAuthContext = createContext({});

const UserAuth = ({ children }) => {
    const { verify, logout, loggedIn,updateData,currentUser,cartUpdate,currentCart,setCurrentBuyProduct,currentBuyProduct} = UserProviderAuth();
    // const { error, data, loading } = useQuery(GET_USER_BY_ID);
  
    
  
    useEffect(() => {
        if (auth.isAuthenticated() == false) {
            verify();
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{ verify, logout, currentUser, loggedIn ,updateData,cartUpdate,currentCart,setCurrentBuyProduct,currentBuyProduct}}>
            <div>
                {children}
            </div>
        </UserAuthContext.Provider>
    )
}

export default UserAuth;

export const UserAuthFinal = () => {
    return useContext(UserAuthContext)
}


const UserProviderAuth = () => {
    const [isUpdated,setIsUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentCart,setCurrentCart] = useState(cartHelp.getCart());
    const [currentBuyProduct,setCurrentBuyProduct] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:4000/graphql',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+auth?.isAuthenticated()
            },
            body:JSON.stringify({
                query:`
                query{
                    getUserByID{
                      error
                      message
                      data{
                        _id
                        name 
                        email
                        user_type
                      }
                    }
                  }
                `
            })
        }).then(res=>res.json())
        .then(data=>{
            
        setCurrentUser(data.data.getUserByID.data)
        })
    },[auth.isAuthenticated()])

    const navigate = useNavigate();

    // const userData = async ()=>{
    //     if(auth.isAuthenticated()!==false){

    //         if(!data.getUserByID.error){
    //             setCurrentUser(data.getUserByID.data)
    //         }
    //     }


    // }
    const updateData = ()=>{
        setIsUpdated(true);
    }

    const loggedIn = () => {
        if (auth.isAuthenticated() !== false) {
            return true;
        }
        return false;
    }

    const verify = () => {

        if (auth.isAuthenticated() !== false) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    const logout = () => {
        auth.clearJWT(() => {

        })

        navigate('/login')
    }
    const cartUpdate = ()=>{
       setCurrentCart(cartHelp.getCart());
    }
    return {
        verify, logout, loggedIn,updateData,currentUser,setCurrentUser,cartUpdate,currentCart,currentBuyProduct,setCurrentBuyProduct
    }
}

