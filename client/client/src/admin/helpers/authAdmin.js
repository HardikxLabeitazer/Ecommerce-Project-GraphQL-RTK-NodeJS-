const authAdmin = {
    isAuthenticated(){
        if(typeof window =='undefined'){return false};

        if(sessionStorage.getItem('admintoken')){
            return JSON.parse(sessionStorage.getItem('admintoken'))
        }else return false
    },
    authenticate(jwt,cb){
        if(typeof window !== 'undefined')
            sessionStorage.setItem('admintoken',JSON.stringify(jwt))
        cb()
    },
    clearJWT(cb){
        if(typeof window !=='undefined'){
            sessionStorage.removeItem('admintoken')
        }
        cb()
        
    }
}

export default authAdmin