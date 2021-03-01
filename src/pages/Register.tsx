import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as z from 'zod';

import { fb } from '../firebase';

import AuthLayout from '../components/AuthLayout';
import TextField from '../components/TextField';

const registrationSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'This field is required.' }),
    lastName: z.string().nonempty({ message: 'This field is required.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match.',
    path: ['passwordConfirm'],
  });

type RegisterFormFields = z.infer<typeof registrationSchema>;

const Register = () => {
  const { errors, handleSubmit, register } = useForm<RegisterFormFields>({
    resolver: zodResolver(registrationSchema),
  });
  const history = useHistory();

  const onSubmit = async (values: RegisterFormFields) => {
    const { email, password } = values;

    try {
      await fb.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={errors.firstName}
          label="First Name"
          name="firstName"
          ref={register}
        />
        <TextField
          error={errors.lastName}
          label="Last Name"
          name="lastName"
          ref={register}
        />
        <TextField
          error={errors.email}
          label="Email"
          name="email"
          ref={register}
          type="email"
        />
        <TextField
          error={errors.password}
          label="Password"
          name="password"
          ref={register}
          type="password"
        />
        <TextField
          error={errors.passwordConfirm}
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

export default Register;
