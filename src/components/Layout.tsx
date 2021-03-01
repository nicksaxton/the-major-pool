import * as React from 'react';

import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Navbar />
    <div className="container p-5">
      <div className="box">{children}</div>
    </div>
  </div>
);

export default Layout;
