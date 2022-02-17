import React, { useContext, useState, useEffect } from "react";
import { ProfileBody } from "./body";

export const ProfilePage = () => {
  return (
    <div className="profile-wrapper">
      <div className="profile-title">Profile Dashboard</div>
      <ProfileBody />
    </div>
  );
};
