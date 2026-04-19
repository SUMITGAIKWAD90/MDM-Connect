const SCHOOL_ACCOUNTS_KEY = 'mdm.school.accounts.v1';
const SCHOOL_SESSION_KEY = 'mdm.school.session.v1';

const normalizeSchoolAccount = (item) => ({
  udiseCode: String(item.udiseCode || '').trim(),
  schoolName: String(item.schoolName || '').trim(),
  state: String(item.state || '').trim(),
  district: String(item.district || '').trim(),
  city: String(item.city || '').trim(),
  townVillage: String(item.townVillage || '').trim(),
  pincode: String(item.pincode || '').trim(),
  headName: String(item.headName || '').trim(),
  schoolEmail: String(item.schoolEmail || '').trim().toLowerCase(),
  password: String(item.password || ''),
  createdAt: item.createdAt || new Date().toISOString(),
});

const readAccounts = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SCHOOL_ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeSchoolAccount);
  } catch (error) {
    return [];
  }
};

const writeAccounts = (accounts) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SCHOOL_ACCOUNTS_KEY, JSON.stringify(accounts.map(normalizeSchoolAccount)));
};

export const registerSchoolAccount = (schoolInput) => {
  const account = normalizeSchoolAccount(schoolInput);
  const accounts = readAccounts();

  if (accounts.some((item) => item.schoolEmail === account.schoolEmail)) {
    throw new Error('email_exists');
  }
  if (accounts.some((item) => item.udiseCode === account.udiseCode)) {
    throw new Error('udise_exists');
  }

  writeAccounts([account, ...accounts]);
  return account;
};

export const loginSchoolAccount = ({ schoolEmail, password }) => {
  const email = String(schoolEmail || '').trim().toLowerCase();
  const accounts = readAccounts();
  const found = accounts.find((item) => item.schoolEmail === email && item.password === password);
  if (!found) return null;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SCHOOL_SESSION_KEY, JSON.stringify(found));
  }
  return found;
};

export const getCurrentSchoolSession = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SCHOOL_SESSION_KEY);
    if (!raw) return null;
    return normalizeSchoolAccount(JSON.parse(raw));
  } catch (error) {
    return null;
  }
};

export const logoutSchoolSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SCHOOL_SESSION_KEY);
};
