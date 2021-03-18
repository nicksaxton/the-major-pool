import * as React from 'react';

import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
    const { auth, profile } = React.useContext(AuthContext);

    const userId = auth?.uid;
    const name = profile && `${profile.firstName} ${profile.lastName}`;

    return {
        name,
        userId
    };
};

export default useAuth;
