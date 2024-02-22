
export function getToken() {       // staring point  for session
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return getToken() ? true : false;
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
  return localStorage.getItem('user') === "true";
}


// export function isAdmin() {
//   console.log("usermail-----> ",localStorage.getItem('userEmail'));
 
//   if(localStorage.getItem('userEmail') === "admin@gmail.com") {
//     return true
//   } 
//    else return false;
// }


export function isAdmin() {
  const userEmail = localStorage.getItem('userEmail');
  return userEmail && userEmail.toLowerCase() === "admin@gmail.com";
}


