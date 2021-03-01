import { User } from '@firebase/auth-types';
import * as React from 'react';

import { fb } from '../firebase';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthAction = {
  type: 'LOG_IN' | 'LOG_OUT';
  payload?: any;
};

interface AuthContextInterface {
  auth?: User;
  update: (action: AuthAction) => void;
  verifying: boolean;
}

const AuthContext = React.createContext<AuthContextInterface>({
  auth: undefined,
  update: (action: AuthAction) => {},
  verifying: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = React.useState<User | undefined>(undefined);
  const [verifying, setVerifying] = React.useState(true);

  React.useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(undefined);
      }

      setVerifying(false);
    });
  }, []);

  const update = (action: AuthAction) => {
    if (action.type === 'LOG_IN') {
      setAuth(action.payload);
    }
  };

  console.log(auth, verifying);

  return (
    <AuthContext.Provider value={{ auth, update, verifying }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
