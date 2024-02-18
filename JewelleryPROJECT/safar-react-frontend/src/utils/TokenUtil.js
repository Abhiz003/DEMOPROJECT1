export function isAuthenticated() {
  return getToken() ? true : false;
}
export function getToken() {

  return localStorage.getItem("token");
}

export function logout() {
  localStorage.clear();
  sessionStorage.clear();
}


export function isBlogger() {
  return localStorage.getItem("blogger") === "true";
}



export function getUserId() {
  // return sessionStorage.getItem('userId');

  return localStorage.getItem('userId');
}





export function isUser() {
  return localStorage.getItem("user") === "true";
}


export function isAdmin() {
  if(localStorage.getItem("userEmail") === "admin@gmail.com") {
    return true
  } 
  return false;
}


