export function setToken(tokenObj) {
  localStorage.setItem("access_token", tokenObj.access_token);
  localStorage.setItem("refresh_token", tokenObj.refresh_token);
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function clearToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function setUserLocal(tokenObj) {
  if (tokenObj.displayName) {
    localStorage.setItem("displayName", tokenObj.displayName);
  }
  localStorage.setItem("email", tokenObj.email);
}

export function getUserLocal() {
  let displayName =  localStorage.getItem("displayName");
  let email =  localStorage.getItem("email");
  return { displayName, email }
}

export function clearUserLocal() {
  localStorage.removeItem("displayName");
  localStorage.removeItem("email");
}