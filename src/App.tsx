import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Layout from './components/Layout';
import LogIn from './pages/LogIn';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Layout>
          <Route path="/">Test</Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
