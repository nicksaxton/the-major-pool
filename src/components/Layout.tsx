import * as React from 'react';

import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Navbar />
    <div className="container">{children}</div>
  </div>
);

export default Layout;
