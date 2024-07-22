import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import ClientProvider from '@/graphql/ClientProvider';
import { AlertProvider } from '@/components/hooks/AlertContext';
import { UserProvider } from '@/components/hooks/UserContext';
import { DateProvider } from '@/components/hooks/DatesContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <UserProvider>
        <DateProvider>
          <ClientProvider>
            <Component {...pageProps} />
          </ClientProvider>
        </DateProvider>
      </UserProvider>
    </AlertProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
