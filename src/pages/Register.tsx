import * as React from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const Register = () => {
  const { register } = useForm();

  return (
    <AuthLayout>
      <form>
        <TextField label="First Name" name="firstName" ref={register} />
        <TextField label="Last Name" name="lastName" ref={register} />
        <TextField label="Email" name="email" ref={register} type="email" />
        <TextField
          label="Password"
          name="password"
          ref={register}
          type="password"
        />
        <TextField
          label="Confirm Password"
          name="passwordConfirm"
          ref={register}
          type="password"
        />
        <div className="field">
          <div className="control">
            <button className="button is-link is-large is-fullwidth">
              Register
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link is-light is-fullwidth">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
