import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const { auth } = React.useContext(AuthContext);

    if (auth) {
        return <Redirect to="/" />;
    }

    return (
        <div className="hero is-link is-fullheight">
            <div className="hero-body is-justify-content-center is-flex-direction-column">
                <h1 className="title is-1 has-text-centered">The Major Pool</h1>
                <div className="columns is-centered" style={{ width: '100%' }}>
                    <div className="column is-two-fifths">
                        <div className="box">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
