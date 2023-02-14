import { gql } from "@apollo/client";


export const files={
    UPLOAD_FILES:gql`
    mutation uploadFile($file:Upload!){
        uploadFile(file:$file){
            url
        }
    }
    `
    
}