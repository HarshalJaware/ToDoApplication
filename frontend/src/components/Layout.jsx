import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <>
    <header className="app-header">To Do Application</header>

    <main className="app-main">{children}</main>

    {/* <footer className="app-footer">{new Date().getFullYear()}. All rights reserved.</footer> */}
  </>
);

export default Layout;