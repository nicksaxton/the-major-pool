import * as React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="hero is-link is-fullheight">
    <div className="hero-body is-justify-content-center is-flex-direction-column">
      <h1 className="title is-1">The Major Pool</h1>
      <div className="columns is-centered" style={{ width: '100%' }}>
        <div className="column is-two-fifths">
          <div className="box">{children}</div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
