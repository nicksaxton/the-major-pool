import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthContext } from './context/AuthProvider';

import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import LogIn from './pages/LogIn';
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
                    <ProtectedRoute path="/">Test</ProtectedRoute>
                </Layout>
            </Switch>
        </Router>
    );
};

export default App;
