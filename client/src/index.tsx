import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bulma/css/bulma.min.css';
import 'bulma-pageloader/dist/css/bulma-pageloader.min.css';

import AuthProvider from './context/AuthProvider';
import NotificationProvider from './context/NotificationProvider';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <NotificationProvider>
                <App />
            </NotificationProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
