import Link from 'next/link';

import { Heading } from '../ui/Typography';

function NavBar() {
  return (
    <div className={'w-1/6 bg-cyan-100'}>
      <ul>
        <Heading variant={'h3'}>Nav</Heading>
        <li>
          <Link href={'/'}>Dashboard</Link>
        </li>
        <li>
          <Link href={'/contacts'}>Contacts</Link>
        </li>
        <li>
          <Link href={'/locations'}>Locations</Link>
        </li>
      </ul>
      <ul>
        <Heading variant={'h3'}>Account</Heading>
        <li>
          <Link href={'/adapters'}>Adapters</Link>
        </li>
        <li>
          <Link href={'/events'}>Events</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
