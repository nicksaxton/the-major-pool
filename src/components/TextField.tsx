import * as React from 'react';

type TextFieldProps = {
  label?: string;
  name: string;
  type?: 'email' | 'password' | 'text';
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, name, type = 'text' }, ref) => {
    return (
      <div className="field">
        {label && (
          <label htmlFor={name} className="label">
            {label}
          </label>
        )}
        <div className="control">
          <input
            className="input is-large"
            id={name}
            name={name}
            ref={ref}
            type={type}
          />
        </div>
      </div>
    );
  }
);

export default TextField;
