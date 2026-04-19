import transactionSeedData from './transactionsSeed.json';

const PUBLIC_TX_STORAGE_KEY = 'mdm.public.transactions.v1';
const MAX_STORED_TRANSACTIONS = 100;

const toDateOnly = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
};

const normalizeTx = (item) => {
  const schoolId = String(item.schoolId || item.schoolCode || '').trim();
  const txId = String(item.txId || item.txHash || '').trim();
  const timestamp = item.timestamp || new Date().toISOString();
  const date = item.date || toDateOnly(timestamp);

  return {
    schoolId: schoolId || '-',
    schoolName: item.schoolName || (schoolId ? `School ${schoolId}` : 'Unknown School'),
    txId: txId || `local-${Date.now()}`,
    purpose: item.purpose || '-',
    amountInr: String(item.amountInr ?? item.amount ?? '').trim(),
    amountPol: item.amountPol ? String(item.amountPol) : '',
    date,
    status: item.status || 'Pending',
    block: item.block || item.blockNumber || '-',
    explorer: item.explorer || '',
    timestamp,
  };
};

const sortNewestFirst = (a, b) => new Date(b.timestamp || b.date).getTime() - new Date(a.timestamp || a.date).getTime();

const readStoredTransactions = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PUBLIC_TX_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTx);
  } catch (error) {
    return [];
  }
};

export const transactionSeed = transactionSeedData.map(normalizeTx).sort(sortNewestFirst);

export const getPublicTransactions = () => {
  const seed = transactionSeed;
  const recent = readStoredTransactions();
  const byTxId = new Map();

  [...recent, ...seed].forEach((item) => {
    if (!byTxId.has(item.txId)) {
      byTxId.set(item.txId, item);
    }
  });

  return Array.from(byTxId.values()).sort(sortNewestFirst);
};

export const savePublicTransaction = (tx) => {
  if (typeof window === 'undefined') return;
  const normalized = normalizeTx(tx);
  const existing = readStoredTransactions();
  const deduped = [normalized, ...existing.filter((item) => item.txId !== normalized.txId)].slice(0, MAX_STORED_TRANSACTIONS);

  window.localStorage.setItem(PUBLIC_TX_STORAGE_KEY, JSON.stringify(deduped));
};
