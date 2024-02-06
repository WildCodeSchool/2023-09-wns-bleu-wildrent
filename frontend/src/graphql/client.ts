import { ApolloClient, InMemoryCache } from '@apollo/client';
import getApiUrl from '@/utils/getApiUrl';

const uri = getApiUrl();
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
