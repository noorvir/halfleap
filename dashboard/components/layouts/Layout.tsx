import React from 'react';

import MenuBar from './MenuBar';

function Body(props: any) {
  return (
    <main
      className={`layout-body flex flex-grow flex-col bg-primary-white p-16 ${
        props.className || ''
      }`}
    >
      {props.children}
    </main>
  );
}

function Layout(props: any) {
  return (
    <div
      id={'layout'}
      className={`layout max-w-8xl m-auto flex h-full min-h-screen flex-col ${
        props.className || ''
      }`}
    >
      {props.children}
    </div>
  );
}

Layout.Body = Body;
Layout.MenuBar = MenuBar;

export default Layout;
