import * as React from 'react';

import Navbar from './Navbar';
import Notification from './Notification';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <div>
        <Navbar />
        <div className="container px-5">
            <Notification />
            {children}
        </div>
    </div>
);

export default Layout;
