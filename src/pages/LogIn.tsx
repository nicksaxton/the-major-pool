import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const LogIn = () => {
  const { register } = useForm();

  return (
    <AuthLayout>
      <form>
        <TextField label="Email" name="email" ref={register} type="email" />
        <TextField
          label="Password"
          name="password"
          ref={register}
          type="password"
        />
        <div className="field">
          <div className="control">
            <button className="button is-link is-large is-fullwidth">
              Log In
            </button>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control is-flex-grow-1">
            <Link
              className="button is-link is-light is-fullwidth"
              to="/register"
            >
              Register
            </Link>
          </div>
          <div className="control is-flex-grow-1">
            <button className="button is-link is-inverted is-fullwidth">
              Forgot Password
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LogIn;
