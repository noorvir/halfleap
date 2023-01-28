import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import supabase from 'lib/supabase';

import Auth from 'components/layouts/Auth';

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
    <main>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Wrapped Component={Component} {...pageProps} />
      </SessionContextProvider>
    </main>
  );
}

export default App;
