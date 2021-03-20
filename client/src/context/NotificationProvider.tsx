import * as React from 'react';

type NotificationProviderProps = {
    children: React.ReactNode;
};

interface NotificationContextInterface {
    closeMessage: () => void;
    message: string;
    setErrorMessage: (message: string) => void;
    setSuccessMessage: (message: string) => void;
    type: 'success' | 'danger';
}

const NotificationContext = React.createContext<NotificationContextInterface>({
    closeMessage: () => {},
    message: '',
    setErrorMessage: (message: string) => {},
    setSuccessMessage: (message: string) => {},
    type: 'success'
});

const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState<'success' | 'danger'>('success');

    const closeMessage = () => {
        setMessage('');
    };

    const setErrorMessage = (message: string) => {
        setMessage(message);
        setType('danger');
    };

    const setSuccessMessage = (message: string) => {
        setMessage(message);
        setType('success');
    };

    return (
        <NotificationContext.Provider
            value={{
                closeMessage,
                message,
                setErrorMessage,
                setSuccessMessage,
                type
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext };

export default NotificationProvider;
