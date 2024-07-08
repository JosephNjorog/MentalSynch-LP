// src/components/Auth/SocialLogin.js

import React from 'react';

const SocialLogin = () => {
  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/auth/google`;
  };

  const facebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/auth/facebook`;
  };

  return (
    <div className="social-login">
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={facebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default SocialLogin;
