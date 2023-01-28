import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { FiFile, FiLogOut, FiUser } from 'react-icons/fi';

import { logout } from 'lib/auth';
import useAuthUser from 'lib/hooks/useAuthUser';
import { AuthUser } from 'lib/types';

import { Text } from 'components/ui/Typography';

interface Props {
  user: AuthUser;
}

const Account: React.FC<Props> = ({ user }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Menu className="relative" as={'div'}>
      <Menu.Button className="h-10 w-10 rounded-full bg-primary-blue flex items-center justify-center overflow-hidden">
        <Image src={user.user_metadata.avatar_url} width={40} height={40} alt="avatar" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute flex flex-col right-0 p-4 bg-system-grey6 space-y-5 mt-3 rounded-lg">
          <Link
            href={'/'}
            className="text-primary-white hover:text-system-grey4 transition-colors"
          >
            <Text variant="body" className="flex items-center">
              <FiFile size={16} className="mr-2" />
              Projects
            </Text>
          </Link>
          <Link
            href={'/settings'}
            className="text-primary-white hover:text-system-grey4 transition-colors"
          >
            <Text variant="body" className="flex items-center">
              <FiUser size={16} className="mr-2" />
              Settings
            </Text>
          </Link>
          <button onClick={() => logout()}>
            <Text
              variant="body"
              className="flex items-center text-primary-white hover:text-system-grey4 "
            >
              <FiLogOut size={16} className="mr-2" />
              Log out
            </Text>
          </button>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type NavBarProps = {
  color?: string;
  size?: 'regular' | 'small';
  className?: string;
  breadcrumbs?: React.ReactElement;
};

function NavigationBar(props: NavBarProps) {
  const { breadcrumbs } = props;

  const user = useAuthUser();

  return (
    <div
      className={`w-full h-16 fixed top-0 bg-primary-black left-0 right-0 flex items-center justify-between text-primary-white border-b border-system-grey6 z-100 px-3 ${props.className}`}
    >
      <div className="space-x-6 flex items-center">
        <Link href="/">
          <Image
            className="h-10"
            src="/logo.svg"
            width={40}
            height={40}
            alt="Unweave Logo"
          />
        </Link>
        {breadcrumbs || null}
      </div>

      <div className="space-x-8 flex items-center">
        <Account user={user} />
      </div>
    </div>
  );
}

export default NavigationBar;
