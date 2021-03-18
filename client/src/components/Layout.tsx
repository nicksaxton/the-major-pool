import * as React from 'react';

import Navbar from './Navbar';
import Notification from './Notification';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <div>
        <Navbar />
        <Notification />
        <div className="container px-5">{children}</div>
    </div>
);

export default Layout;
