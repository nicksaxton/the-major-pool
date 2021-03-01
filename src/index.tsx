import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bulma/css/bulma.min.css';

import AuthProvider from './context/AuthProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
