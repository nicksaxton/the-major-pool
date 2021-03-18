import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import * as z from 'zod';

import { fb } from '../firebase';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long.'),
        passwordConfirm: z.string()
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm']
    });

type ResetPasswordFormFields = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
    const { errors, handleSubmit, register } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    });
    const { search } = useLocation();

    const [formError, setFormError] = React.useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = React.useState(
        false
    );

    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('oobCode');

    const onSubmit = async ({ password }: ResetPasswordFormFields) => {
        try {
            if (code) {
                await fb.auth().confirmPasswordReset(code, password);
                setResetPasswordSuccess(true);
            }
        } catch (error) {
            setFormError(error.message);
            console.error(error);
        }
    };

    const renderResetPasswordForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {formError && (
                    <div className="notification is-danger is-light">
                        {formError}
                    </div>
                )}
                <TextField
                    error={errors.password}
                    label="New Password"
                    name="password"
                    ref={register}
                    type="password"
                />
                <TextField
                    error={errors.passwordConfirm}
                    label="Confirm New Password"
                    name="passwordConfirm"
                    ref={register}
                    type="password"
                />
                <div className="field">
                    <div className="control">
                        <button
                            className="button is-link is-fullwidth is-large"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    };

    const renderResetPasswordSuccess = () => {
        return (
            <>
                <div className="notification is-success is-light">
                    Your password has been successfully reset.
                </div>
                <Link
                    className="button is-large is-fullwidth is-link"
                    to="/login"
                >
                    Log In
                </Link>
            </>
        );
    };

    return (
        <AuthLayout>
            {resetPasswordSuccess
                ? renderResetPasswordSuccess()
                : renderResetPasswordForm()}
        </AuthLayout>
    );
};

export default ResetPassword;
