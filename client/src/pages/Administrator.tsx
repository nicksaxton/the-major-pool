import * as React from 'react';

import useEntries from '../hooks/useEntries';
import useUsers from '../hooks/useUsers';

import Loader from '../components/Loader';

const Administrator = () => {
    const { entries, loadingEntries } = useEntries();
    const { loadingUsers, userMap } = useUsers();

    if (loadingEntries || loadingUsers) {
        return <Loader />;
    }

    return (
        <>
            <h1 className="mb-2 has-text-weight-bold is-size-2">
                Administrator
            </h1>
            {entries.length > 0 ? (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Entry Name</th>
                            <th>Owner</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => {
                            const owner = userMap[entry.userId];

                            return (
                                <tr key={entry.entryId}>
                                    <td>{entry.name}</td>
                                    <td>{`${owner?.firstName} ${owner?.lastName}`}</td>
                                    <td className="has-text-right">
                                        <button className="button is-danger is-small">
                                            Delete Entry
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>There are no entries yet.</p>
            )}
        </>
    );
};

export default Administrator;
