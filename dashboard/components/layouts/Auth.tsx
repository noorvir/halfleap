import React, { useState } from 'react';


import Button from 'components/ui/Button';
import Input from 'components/ui/Input/Input';

import Layout from './Layout';
import {loginWithPassword, loginWithMagicLink} from "../../lib/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    loginWithMagicLink(email)
    setIsLoading(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return (
    <div className={'mx-auto max-w-screen-mobile space-y-1 text-center'}>
      <h2 className={'text-h2'}>Login to Halfleap</h2>
      <Input
        value={email}
        type={'email'}
        placeholder={'Email'}
        autoComplete={'email'}
        onChange={handleEmailChange}
        className={'pt-4'}
      />
      <Button stretch={true} onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

function Auth() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  return (
    <Layout>
      <Layout.Body>
        <Login />
      </Layout.Body>
    </Layout>
  );
}

export default Auth;
