import * as React from 'react';
import { Link } from 'react-router-dom';

import { fb } from '../firebase';

import useAuth from '../hooks/useAuth';

const Home = () => {
    const { userId } = useAuth();

    React.useEffect(() => {
        const getUserEntries = async () => {
            try {
            } catch (error) {
                console.error(error);
            }
        };

        getUserEntries();
    }, [userId]);

    return (
        <>
            <h2 className="title">Entries</h2>
            <div className="content">
                <p>
                    You haven't created any entries yet. Click the button below
                    to create one.
                </p>
                <Link className="button is-link" to="/entries/new">
                    Create Entry
                </Link>
            </div>
        </>
    );
};

export default Home;
