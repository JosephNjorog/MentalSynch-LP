// src/components/LoginForm.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const LoginForm = () => {
  const formik = useFormik({
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      {formik.errors.api ? <div>{formik.errors.api}</div> : null}
      <button type="submit" disabled={formik.isSubmitting}>Login</button>
    </form>
  );
};

export default LoginForm;
