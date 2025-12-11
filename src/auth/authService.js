const USER_KEY = 'om_user';
const SESSION_KEY = 'om_session';

export function getUser() {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Could not parse stored user', error);
    return null;
  }
}

export function saveUser(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated() {
  return localStorage.getItem(SESSION_KEY) === 'true';
}

export function login(email, password) {
  const existingUser = getUser();
  if (!existingUser) return false;

  const emailMatches = existingUser.email === email;
  const passwordMatches = existingUser.password
    ? existingUser.password === password
    : true;

  if (emailMatches && passwordMatches) {
    localStorage.setItem(SESSION_KEY, 'true');
    return true;
  }

  return false;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
