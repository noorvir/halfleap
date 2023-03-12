import Link from 'next/link';

function NavBar() {
  return (
    <div className={'bg-cyan-100 w-1/6'}>
      <ul>
        <h3>Nav</h3>
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
        <h3>Account</h3>
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
