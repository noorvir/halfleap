import { HALFLEAP_API_URL } from 'lib/constants';
import { post } from 'lib/fetch';

import supabase from './supabase';

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
};

async function loginWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
}

async function loginWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
  }
}

async function loginWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  })
  if (error) {
    console.error(error);
  }
}


export { loginWithGitHub, loginWithPassword, loginWithMagicLink, logout };
