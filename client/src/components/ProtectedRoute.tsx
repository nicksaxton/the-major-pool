import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path: string;
};

const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
  const { auth } = React.useContext(AuthContext);

  return auth ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
