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
  return localStorage.getItem("blogger") === 'true';
}



export function getUserId() {
  return localStorage.getItem('userId');
}





export function isUser() {
  return localStorage.getItem('user') === 'true';
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


