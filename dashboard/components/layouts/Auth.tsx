import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { FiGithub } from 'react-icons/fi';

import { loginWithGitHub } from 'lib/auth';
import supabase from 'lib/supabase';

// import { loginWithGitHub } from 'lib/auth';
import { Button } from 'components/ui/Button';
import Input from 'components/ui/Input/Input';
import { Heading, Text } from 'components/ui/Typography';

import Layout from './Layout';

function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only"> Init new account</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isGenesis, setIsGenesis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    loginWithGitHub();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  // TODO: make sure only the admin can login

  const handleGenesis = async () => {
    setIsLoading(true);

    const res = await fetch('/genesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        secret: password,
        firstName,
        lastName,
      }),
    });
  };

  return (
    <Layout>
      <Layout.Body>
        <form className="">
          <Toggle enabled={isGenesis} setEnabled={setIsGenesis} />
          <div className="">
            <Heading variant="h2">Halfleap Admin Login</Heading>
            <Text variant="body">Please login with your Github account</Text>
          </div>
          <div>
            <Input
              variant={'large'}
              label={'Email'}
              value={email}
              type={'email'}
              placeholder={'Email'}
              onChange={handleEmailChange}
            />
            <Input
              variant={'large'}
              label={'Password'}
              type={'password'}
              placeholder={'Password'}
              onChange={handlePasswordChange}
            />
          </div>
          {isGenesis && (
            <>
              <Input
                variant={'large'}
                label={'First Name'}
                type={'text'}
                autoComplete={'given-name'}
                placeholder={'First Name'}
                onChange={handleFirstNameChange}
              />
              <Input
                variant={'large'}
                label={'Last Name'}
                type={'text'}
                autoComplete={'family-name'}
                placeholder={'Last Name'}
                onChange={handleLastNameChange}
              />
            </>
          )}
          <Button variant={'action'} onClick={handleLogin}>
            Login with Github
          </Button>
        </form>
      </Layout.Body>
    </Layout>
  );
}

export default Auth;
