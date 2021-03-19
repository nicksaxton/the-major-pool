import * as React from 'react';

import { fb } from '../firebase';

import { User, UserMap } from '../types';

const useUsers = () => {
    const [loadingUsers, setLoadingUsers] = React.useState(true);
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const currentUsers: User[] = [];
                const results = await fb.firestore().collection('users').get();
                results.forEach((result) => {
                    currentUsers.push({
                        ...result.data(),
                        userId: result.id
                    } as User);
                });
                setUsers(currentUsers);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingUsers(false);
            }
        };

        getUsers();
    }, []);

    const userMap: UserMap = React.useMemo(() => {
        return users.reduce<UserMap>((userMap, user) => {
            userMap[user.userId] = user;
            return userMap;
        }, {});
    }, [users]);

    return { loadingUsers, userMap };
};

export default useUsers;
