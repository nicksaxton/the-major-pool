import classNames from 'classnames';
import * as React from 'react';

type ConfirmationModalProps = {
    confirmText?: string;
    denyText?: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
};

const ConfirmationModal = ({
    confirmText = 'OK',
    denyText = 'Cancel',
    message,
    onClose,
    onConfirm,
    open,
    title
}: ConfirmationModalProps) => {
    const [shown, setShown] = React.useState(false);

    React.useEffect(() => {
        setShown(open);
    }, [open]);

    const closeModal = () => {
        setShown(false);
        onClose();
    };

    return (
        <div className={classNames('modal', { 'is-active': shown })}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">{message}</section>
                <footer className="modal-card-foot is-justify-content-flex-end">
                    <button className="button is-danger" onClick={onConfirm}>
                        {confirmText}
                    </button>
                    <button className="button" onClick={closeModal}>
                        {denyText}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmationModal;
