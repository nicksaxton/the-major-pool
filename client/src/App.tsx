import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { AuthContext } from './context/AuthProvider';

import useEntries from './hooks/useEntries';

import Administrator from './pages/Administrator';
import Entries from './pages/Entries';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Leaderboard from './pages/Leaderboard';
import LogIn from './pages/LogIn';
import ManageEntry from './pages/ManageEntry';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const { verifying } = React.useContext(AuthContext);
  const { entriesLocked } = useEntries();

  if (verifying) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/password">
          <ForgotPassword />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/reset_password">
          <ResetPassword />
        </Route>
        <Layout>
          <Switch>
            <ProtectedRoute path="/administrator">
              <Administrator />
            </ProtectedRoute>
            <ProtectedRoute path="/entries/:id">
              <ManageEntry />
            </ProtectedRoute>
            <ProtectedRoute path="/entries">
              <Entries />
            </ProtectedRoute>
            <ProtectedRoute path="/leaderboard">
              <Leaderboard />
            </ProtectedRoute>
            <ProtectedRoute path="/">
              <Redirect to={entriesLocked ? '/leaderboard/us' : '/entries'} />
            </ProtectedRoute>
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
