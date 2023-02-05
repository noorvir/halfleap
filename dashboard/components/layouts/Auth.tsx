import {Switch} from '@headlessui/react';
import React, {useState} from 'react';
import {FiGithub} from 'react-icons/fi';

import {loginWithGitHub, loginWithPassword} from 'lib/auth';
import useCreateAccountMutation from 'lib/hooks/useCreateAccountMutation';
import supabase from 'lib/supabase';

// import { loginWithGitHub } from 'lib/auth';
import {Button} from 'components/ui/Button';
import Input from 'components/ui/Input/Input';
import {Heading, Text} from 'components/ui/Typography';

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

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isGenesis, setIsGenesis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {mutate} = useCreateAccountMutation();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
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

    const handleSubmit = async (e: React.FormEvent<any>) => {
        e.preventDefault();
        setIsLoading(true);
        mutate({email, password, firstName, lastName});
    };

    return (
        <div className={'space-y-1'}>
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
                autoComplete={'current-password'}
                onChange={handlePasswordChange}
            />
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
            <Button variant={'action'} onClick={handleSubmit}>
                Login
            </Button>
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<any>) => {
        e.preventDefault();
        setIsLoading(true);
        loginWithPassword(email, password);
    };


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    return (
        <div className={'space-y-1'}>
            <Input
                variant={'large'}
                label={'Email'}
                value={email}
                type={'email'}
                placeholder={'Email'}
                autoComplete={'email'}
                onChange={handleEmailChange}
            />
            <Input
                variant={'large'}
                label={'Password'}
                type={'password'}
                placeholder={'Password'}
                value={password}
                autoComplete={'current-password'}
                onChange={handlePasswordChange}
            />
            <Button variant={'action'} onClick={handleLogin}>
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
                <Toggle enabled={isCreateAccount} setEnabled={setIsCreateAccount}/>
                <form className="max-w-lg space-y-2">
                    {isCreateAccount ? (
                        <div className="">
                            <Heading variant="h2">Create a new Halfleap Admin Account</Heading>
                            <Text variant="body"></Text>
                            <CreateAccount/>
                        </div>
                    ) : (
                        <div className="">
                            <Heading variant="h2">Halfleap Admin Login</Heading>
                            <Text variant="body"></Text>
                            <Login/>
                        </div>
                    )}
                </form>
            </Layout.Body>
        </Layout>
    );
}

export default Auth;
