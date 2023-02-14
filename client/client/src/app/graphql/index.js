// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import auth from '../auth/auth';

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql',
//     cache: new InMemoryCache(),
//     headers:{
//         authorization:'Bearer '+ auth.isAuthenticated()
//     },
    
//   });



// export default client;

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {createUploadLink} from 'apollo-upload-client'
import auth from "../../customer/app/auth/auth";


// const httpLink = createHttpLink({
//     uri: 'http://localhost:4000/graphql'
// })

const httpLink = createUploadLink({
    uri:'http://localhost:4000/graphql'
})

let client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache(),
});

export function updateGraphqlHeaders() {
    const authLink = setContext((_, { headers }) => {
        const token = auth.isAuthenticated();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    })
    client.setLink(authLink.concat(httpLink))
}
updateGraphqlHeaders() // Init

export default client;