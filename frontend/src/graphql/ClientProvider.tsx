'use client';

import { ApolloProvider } from '@apollo/client';
import client from './client';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
