const GOV_AUTH_KEY = 'mdm.government.auth.v1';

export const isGovernmentAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(GOV_AUTH_KEY) === 'true';
};

export const setGovernmentAuthenticated = (value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GOV_AUTH_KEY, value ? 'true' : 'false');
};
