import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-c2yi64di.eu.auth0.com"
    clientId="indduNjk1n1888baMt4NLwNuKSIj4WDU"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("app")
);
