const SCHOOL_REQUESTS_KEY = 'mdm.government.school.requests.v2';

const normalizeRequest = (request) => ({
  requestId: String(request.requestId || '').trim() || `REQ-${Date.now()}`,
  schoolId: String(request.schoolId || '').trim() || '-',
  schoolName: request.schoolName || 'Unknown School',
  purpose: request.purpose || '-',
  amountInr: String(request.amountInr || '').trim(),
  studentCount: String(request.studentCount || '').trim(),
  toAddress: String(request.toAddress || '').trim(),
  requestDate: request.requestDate || new Date().toISOString().slice(0, 10),
  status: request.status || 'Pending',
  notes: request.notes || '',
});

const sortByDateDesc = (a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();

const readStoredRequests = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SCHOOL_REQUESTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeRequest);
  } catch (error) {
    return [];
  }
};

const writeStoredRequests = (requests) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SCHOOL_REQUESTS_KEY, JSON.stringify(requests.map(normalizeRequest)));
};

export const getSchoolRequests = () => {
  const stored = readStoredRequests();
  return stored.sort(sortByDateDesc);
};

export const setSchoolRequestStatus = (requestId, status) => {
  const all = getSchoolRequests();
  const updated = all.map((item) => (item.requestId === requestId ? { ...item, status } : item));
  writeStoredRequests(updated);
  return updated;
};

export const createSchoolRequest = (requestInput) => {
  const all = getSchoolRequests();
  const now = new Date();
  const request = normalizeRequest({
    ...requestInput,
    requestId: `REQ-${now.getTime()}`,
    requestDate: now.toISOString().slice(0, 10),
    status: 'Pending',
  });
  const updated = [request, ...all].sort(sortByDateDesc);
  writeStoredRequests(updated);
  return request;
};
