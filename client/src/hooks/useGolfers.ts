import axios from 'axios';
import * as React from 'react';

import { Golfers } from '../types';

const useGolfers = () => {
    const [golfers, setGolfers] = React.useState<Golfers>({});
    const [loadingGolfers, setLoadingGolfers] = React.useState(true);

    React.useEffect(() => {
        const getGolfers = async () => {
            try {
                const response = await axios.get<Golfers>('/golfers');
                setGolfers(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingGolfers(false);
            }
        };

        getGolfers();
    }, []);

    return { golfers, loadingGolfers };
};

export default useGolfers;
