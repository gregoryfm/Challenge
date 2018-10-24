import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const LOCAL_IP = '192.168.25.9';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
          alert(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: `http://${LOCAL_IP}:4000/graphql`,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
