import * as React from 'react';
import { animated, useSpring } from 'react-spring';

import { NotificationContext } from '../context/NotificationProvider';

const Notification = () => {
    const animation = useSpring({
        opacity: 1,
        from: { opacity: 0 }
    });

    const { closeMessage, message, type } = React.useContext(
        NotificationContext
    );

    React.useEffect(() => {
        setTimeout(() => {
            closeMessage();
        }, 10000);
    }, [message, closeMessage]);

    return (
        <div className="columns is-centered">
            <div className="column is-half pb-0">
                {message && (
                    <animated.div
                        className={`notification is-${type} m-3`}
                        style={animation}
                    >
                        <button
                            className="delete"
                            onClick={closeMessage}
                        ></button>
                        {message}
                    </animated.div>
                )}
            </div>
        </div>
    );
};

export default Notification;
