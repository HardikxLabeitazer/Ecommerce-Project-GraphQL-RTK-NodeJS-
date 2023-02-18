

export const validation = {

    price_validator:(name,min,max)=>({
        validator:(_,value)=>{
            if(!value){
                return Promise.reject(new Error("Please Enter the Price"))
            }

            return Promise.resolve();
        }
    })
}