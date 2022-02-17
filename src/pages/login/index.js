import React, { useContext, useState, useEffect } from "react";
import { LoginBody } from "./body";

export const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <div className="login-title">Create Account</div>
      <LoginBody />
    </div>
  );
};
