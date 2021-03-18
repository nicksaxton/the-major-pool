import { User } from '@firebase/auth-types';
import * as React from 'react';

import { fb } from '../firebase';

type AuthProviderProps = {
    children: React.ReactNode;
};

type Profile = {
    admin: boolean;
    firstName: string;
    lastName: string;
};

interface AuthContextInterface {
    auth?: User;
    profile?: Profile;
    verifying: boolean;
}

const AuthContext = React.createContext<AuthContextInterface>({
    auth: undefined,
    profile: undefined,
    verifying: false
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = React.useState<User | undefined>(undefined);
    const [profile, setProfile] = React.useState<Profile | undefined>(
        undefined
    );
    const [verifying, setVerifying] = React.useState(true);

    React.useEffect(() => {
        fb.auth().onAuthStateChanged(async (user) => {
            if (user) {
                setAuth(user);

                try {
                    setProfile(
                        (await (
                            await fb
                                .firestore()
                                .collection('users')
                                .doc(user.uid)
                                .get()
                        ).data()) as Profile
                    );
                } catch (error) {
                    console.error(error);
                }
            } else {
                setAuth(undefined);
            }

            setVerifying(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, profile, verifying }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };

export default AuthProvider;
