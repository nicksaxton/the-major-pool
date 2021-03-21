import * as React from 'react';

import { fb } from '../firebase';

import useEntries from '../hooks/useEntries';
import useUsers from '../hooks/useUsers';

import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';

const Administrator = () => {
    const [entryIdToDelete, setEntryIdToDelete] = React.useState<string | null>(
        null
    );

    const { entries, getEntries, loadingEntries } = useEntries();
    const { loadingUsers, userMap } = useUsers();

    if (loadingEntries || loadingUsers) {
        return <Loader />;
    }

    const handleConfirmDelete = async () => {
        try {
            if (entryIdToDelete) {
                await fb
                    .firestore()
                    .collection('entries')
                    .doc(entryIdToDelete)
                    .delete();
                setEntryIdToDelete(null);
                await getEntries();
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                                        <button
                                            className="button is-danger is-small"
                                            onClick={() =>
                                                setEntryIdToDelete(
                                                    entry.entryId
                                                )
                                            }
                                        >
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
            <ConfirmationModal
                confirmText="Delete"
                message="Are you sure you want to delete this entry?"
                onClose={() => setEntryIdToDelete(null)}
                onConfirm={handleConfirmDelete}
                open={!!entryIdToDelete}
                title="Confirm Delete"
            />
        </>
    );
};

export default Administrator;
