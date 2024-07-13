// src/components/LoginForm.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const LoginForm = () => {
  const formic = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await api.post('/auth/login', values);
        // handle success (e.g., store token, redirect user)
      } catch (error) {
        setErrors({ api: 'Invalid login credentials' });
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formic.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formic.handleChange}
          value={formic.values.email}
        />
        {formic.errors.email ? <div>{formic.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formic.handleChange}
          value={formic.values.password}
        />
        {formic.errors.password ? <div>{formic.errors.password}</div> : null}
      </div>
      {formic.errors.api ? <div>{formic.errors.api}</div> : null}
      <button type="submit" disabled={formic.isSubmitting}>Login</button>
    </form>
  );
};

export default LoginForm;
