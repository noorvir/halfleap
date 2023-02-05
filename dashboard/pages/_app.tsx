import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import supabase from 'lib/supabase';

import Auth from 'components/layouts/Auth';

import '../styles/globals.css';

const queryClient = new QueryClient();

function Wrapped({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    return <Auth />;
  }

  return <Component {...pageProps} />;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={'bg-primary-white'}>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <Wrapped Component={Component} {...pageProps} />
        </SessionContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
