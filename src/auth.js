export function saveAuth(token, name) {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', name);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUserName() {
  return localStorage.getItem('userName');
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
}