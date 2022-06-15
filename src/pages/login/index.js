import React from "react";
import { Redirect } from "react-router"
import { LoginBody } from "./body";

export const LoginPage = () => {
  
  if (localStorage.getItem('refresh_token')) {
    return <Redirect push to="/profile" />
  }

  return (
    <div className="login-wrapper">
      <div className="login-title">Create Account</div>
      <LoginBody />
    </div>
  );
};
