import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { fb } from '../firebase';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LogInFields = z.infer<typeof logInSchema>;

const LogIn = () => {
  const [authError, setAuthError] = React.useState('');

  const { handleSubmit, register } = useForm<LogInFields>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (values: LogInFields) => {
    try {
      const { email, password } = values;
      await fb.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        setAuthError('Invalid email and/or password.');
      } else {
        setAuthError(error.message);
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {authError && (
          <div className="notification is-danger is-light">{authError}</div>
        )}
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
            <Link
              className="button is-link is-inverted is-fullwidth"
              to="/password"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LogIn;
