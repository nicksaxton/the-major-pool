import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as z from 'zod';

import { fb } from '../firebase';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' })
});

type ForgotPasswordFormFields = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const { handleSubmit, register, reset } = useForm<ForgotPasswordFormFields>(
        {
            resolver: zodResolver(forgotPasswordSchema)
        }
    );
    const history = useHistory();

    const [successMessage, setSuccessMessage] = React.useState('');

    const onSubmit = async ({ email }: ForgotPasswordFormFields) => {
        try {
            await fb.auth().sendPasswordResetEmail(email);
            reset();
            setSuccessMessage(
                'An email with instructions on resetting your password should be arriving in your inbox soon.'
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                {successMessage && (
                    <div className="notification is-success is-light">
                        {successMessage}
                    </div>
                )}
                <div className="field">
                    <h5 className="is-size-5">
                        Please enter your email address below. We will email you
                        with instructions on how to reset your password.
                    </h5>
                </div>
                <TextField
                    label="Email"
                    name="email"
                    ref={register}
                    type="email"
                />
                <div className="field">
                    <div className="control">
                        <button className="button is-link is-fullwidth">
                            Reset Password
                        </button>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button
                            className="button is-link is-light is-fullwidth"
                            type="button"
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
