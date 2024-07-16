import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import ClientProvider from '@/graphql/ClientProvider';
import { AlertProvider } from '@/components/providers/AlertContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </AlertProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
