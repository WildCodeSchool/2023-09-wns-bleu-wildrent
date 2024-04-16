import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getApiUrl from '@/utils/getApiUrl';

const API_URL = getApiUrl();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  credentials: 'include',
  cache: new InMemoryCache(),
});

export default client;
