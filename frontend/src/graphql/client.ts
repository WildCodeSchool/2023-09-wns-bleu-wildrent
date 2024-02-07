import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getApiUrl from '@/utils/getApiUrl';

const API_URL = getApiUrl();

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
