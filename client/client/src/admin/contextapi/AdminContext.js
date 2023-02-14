import { useNavigate } from "react-router";
import authAdmin from "../helpers/authAdmin";
import { createContext, useContext, useState, useEffect } from "react";
import { useGetAdminDetailsQuery } from "../app/store/slices/usersApiSlice";


const AdminAuthContext = createContext({});

const AdminAuth = ({ children }) => {
    const { verify, logout, loggedIn,updateData,currentUser,setCurrentUser} =AdminProviderAuth();
 
  
    
  
    useEffect(() => {
        if (authAdmin.isAuthenticated() == false) {
            verify();
        }
    }, [])

    return (
        <AdminAuthContext.Provider value={{ verify, logout, currentUser, loggedIn ,updateData,setCurrentUser}}>
            <div>
                {children}
            </div>
        </AdminAuthContext.Provider>
    )
}

export default AdminAuth;

export const AdminAuthFinal = () => {
    return useContext(AdminAuthContext)
}


const AdminProviderAuth = () => {
    const [isUpdated,setIsUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    
    let userDetails = useGetAdminDetailsQuery();
   
    
    useEffect(()=>{
       setCurrentUser(userDetails?.data?.data)
    },[userDetails.isLoading])

    const navigate = useNavigate();

    // const userData = async ()=>{
    //     if(authadmin.isAuthenticated()!==false){

    //         if(!data.getUserByID.error){
    //             setCurrentUser(data.getUserByID.data)
    //         }
    //     }


    // }
    const updateData = ()=>{
        setIsUpdated(true);
    }

    const loggedIn = () => {
        if (authAdmin.isAuthenticated() !== false) {
            return true;
        }
        return false;
    }

    const verify = () => {

        if (authAdmin.isAuthenticated() !== false) {
            navigate('/admin');
        } else {
            navigate('/admin/login');
        }
    }

    const logout = () => {
        authAdmin.clearJWT(() => {

        })

        navigate('/admin/login')
    }
    
    return {
        verify, logout, loggedIn,updateData,currentUser,setCurrentUser
    }
}

