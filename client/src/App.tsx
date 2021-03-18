import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthContext } from './context/AuthProvider';

import Entries from './pages/Entries';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Layout from './components/Layout';
import Leaderboard from './pages/Leaderboard';
import LogIn from './pages/LogIn';
import ManageEntry from './pages/ManageEntry';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const App = () => {
    const { verifying } = React.useContext(AuthContext);

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
                            <Home />
                        </ProtectedRoute>
                    </Switch>
                </Layout>
            </Switch>
        </Router>
    );
};

export default App;
