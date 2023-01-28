import { useState } from 'react';
import { FiGithub } from 'react-icons/fi';

import { loginWithGitHub } from 'lib/auth';

import { Button } from 'components/ui/Button';
import Input from 'components/ui/Input/Input';
import { Heading, Text } from 'components/ui/Typography';

import Layout from './Layout';

function Auth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    loginWithGitHub();
  };

  const checkIsAdmin = () => {};

  // TODO: make sure only the admin can login
  return (
    <Layout>
      <div className="">
        <div className="text-center flex flex-col items-center ">
          <Heading variant="h2">Halfleap Admin Login</Heading>
          <Text variant="body">Please login with your Github account</Text>
        </div>

        {isAdmin ? (
          <Button
            variant={'large'}
            icon={FiGithub}
            autofocus={true}
            loading={isLoading}
            onClick={handleLogin}
          >
            Login with Github
          </Button>
        ) : (
          <div>
            <Input variant={'large'} label={'Email'} />
            <Button variant={'action'}>submit</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Auth;
