import React from 'react';

import NavigationBar from './NavBar';

function Body(props: any) {
  return (
    <main className={`layout-body flex-grow p-16 flex flex-col ${props.className || ''}`}>
      {props.children}
    </main>
  );
}

function Layout(props: any) {
  return (
    <div
      id={'layout'}
      className={`layout flex flex-col justify-center bg-primary-black w-full h-full  min-h-screen ${
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