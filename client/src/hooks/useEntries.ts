import axios from 'axios';
import * as React from 'react';

const useEntries = () => {
    const [entriesLocked, setEntriesLocked] = React.useState(false);

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
    }, []);

    return {
        entriesLocked
    };
};

export default useEntries;
