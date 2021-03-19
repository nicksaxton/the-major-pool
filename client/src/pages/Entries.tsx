import * as React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import TournamentDisplay from '../components/TournamentDisplay';

import { fb } from '../firebase';

import useAuth from '../hooks/useAuth';
import useEntries from '../hooks/useEntries';
import useGolfers from '../hooks/useGolfers';

import { Entry } from '../types';

const Entries = () => {
    const [entries, setEntries] = React.useState<Entry[]>([]);
    const [loading, setLoading] = React.useState(true);

    const { userId } = useAuth();
    const { golfers, loadingGolfers } = useGolfers();

    const { entriesLocked } = useEntries();

    React.useEffect(() => {
        const getEntries = async () => {
            try {
                const currentEntries: Entry[] = [];
                const result = await fb
                    .firestore()
                    .collection('entries')
                    .where('userId', '==', userId)
                    .get();
                result.forEach((entry) => {
                    currentEntries.push({
                        ...entry.data(),
                        entryId: entry.id
                    } as Entry);
                });
                setEntries(currentEntries);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getEntries();
    }, [userId]);

    if (loading || loadingGolfers) {
        return <Loader />;
    }

    return (
        <>
            <div className="mb-2 is-flex is-justify-content-space-between is-align-items-center">
                <h1 className="has-text-weight-bold is-size-2">Entries</h1>
                {!entriesLocked && (
                    <Link className="button is-link" to="/entries/new">
                        Create Entry
                    </Link>
                )}
            </div>
            {entries.length > 0 ? (
                entries.map((entry) => {
                    return (
                        <div className="box mb-3" key={entry.entryId}>
                            <div className="mb-3 is-flex is-justify-content-space-between is-align-items-center">
                                <h2 className="has-text-weight-bold is-size-4">
                                    {entry.name}
                                </h2>
                                {!entriesLocked && (
                                    <Link
                                        className="button is-link is-light"
                                        to={`/entries/${entry.entryId}`}
                                    >
                                        Edit Entry
                                    </Link>
                                )}
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <TournamentDisplay
                                        color="success"
                                        golfers={golfers}
                                        name="The Masters"
                                        picks={entry.masters}
                                    />
                                </div>
                                <div className="column">
                                    <TournamentDisplay
                                        color="info"
                                        golfers={golfers}
                                        name="PGA Championship"
                                        picks={entry.pga}
                                    />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <TournamentDisplay
                                        color="danger"
                                        golfers={golfers}
                                        name="U.S. Open"
                                        picks={entry.us}
                                    />
                                </div>
                                <div className="column">
                                    <TournamentDisplay
                                        color="warning"
                                        golfers={golfers}
                                        name="The Open Championship"
                                        picks={entry.open}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>
                    You haven't created any entries yet. Click the Create Entry
                    button to get started.
                </p>
            )}
        </>
    );
};

export default Entries;
