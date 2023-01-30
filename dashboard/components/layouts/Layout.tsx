import React from 'react';

import NavigationBar from './NavBar';

function Body(props: any) {
  return (
    <main className={`layout-body bg-primary-white flex flex-grow flex-col p-16 ${props.className || ''}`}>
      {props.children}
    </main>
  );
}

function Layout(props: any) {
  return (
    <div
      id={'layout'}
      className={`layout bg-primary-white flex h-full min-h-screen w-full flex-col ${
        props.className || ''
      }`}
    >
      {props.children}
    </div>
  );
}

Layout.Body = Body;
Layout.NavigationBar = NavigationBar;

export default Layout;
