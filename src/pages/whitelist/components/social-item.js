import React, { useState } from "react";

export const SocialItem = ({ details, status }) => {
  const [socialStatus, setSocialStatus] = useState(status);

  return (
    <div className="whitelist-body__task">
      <div className="whitelist-body__task-name">
        <img className="whitelist-body__task-img" src={details.img} />
        <div className="whitelist-body__task-titles">
          <div className="whitelist-body__task-title">{details.title}</div>
          <div className="whitelist-body__task-subtitle">{details.subtitle}</div>
        </div>
      </div>
      <div className="whitelist-body__task-buttons">
        <a
          onClick={() => {
            setSocialStatus(true);
          }}
          href={details.link}
          target="_blank"
          className="whitelist-body__task-btn whitelist-body__task-btn_go"
        >
          {details.btn1}
        </a>
        <button className="whitelist-body__task-btn whitelist-body__task-btn_did">
          {socialStatus ? "I did this✅" : "Not done yet"}
        </button>
      </div>
    </div>
  );
};
