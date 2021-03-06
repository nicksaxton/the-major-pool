import axios from 'axios';
import * as React from 'react';

import { fb } from '../firebase';

import { Entry } from '../types';

const useEntries = () => {
    const [entries, setEntries] = React.useState<Entry[]>([]);
    const [entriesLocked, setEntriesLocked] = React.useState(false);
    const [loadingEntries, setLoadingEntries] = React.useState(true);

    const getEntries = async () => {
        try {
            setLoadingEntries(true);

            const currentEntries: Entry[] = [];
            const result = await fb.firestore().collection('entries').get();
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
            setLoadingEntries(false);
        }
    };

    React.useEffect(() => {
        const getDate = async () => {
            try {
                const response = await axios.get('/date');
                const date = new Date(response.data);
                const lockDate = new Date('April 7, 2021');
                if (date > lockDate) {
                    setEntriesLocked(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getDate();
        getEntries();
    }, []);

    return {
        entries,
        entriesLocked,
        getEntries,
        loadingEntries
    };
};

export default useEntries;
