import classNames from 'classnames';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type TextFieldProps = {
    error?: FieldError;
    label?: string;
    name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ error, label, name, type = 'text', ...props }, ref) => {
        return (
            <div className="field">
                {label && (
                    <label htmlFor={name} className="label">
                        {label}
                    </label>
                )}
                <div className="control">
                    <input
                        className={classNames('input is-large', {
                            'is-danger': error
                        })}
                        id={name}
                        name={name}
                        ref={ref}
                        type={type}
                        {...props}
                    />
                </div>
                {error && <p className="help is-danger">{error.message}</p>}
            </div>
        );
    }
);

export default TextField;
