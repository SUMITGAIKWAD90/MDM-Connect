const PUBLIC_COMPLAINTS_KEY = 'mdm.public.complaints.v1';

const normalizeComplaint = (item) => ({
  complaintId: String(item.complaintId || '').trim() || `CMP-${Date.now()}`,
  complaint: String(item.complaint || '').trim(),
  files: Array.isArray(item.files) ? item.files : [],
  submittedAt: item.submittedAt || new Date().toISOString(),
  status: item.status || 'Open',
  response: item.response || '',
  respondedAt: item.respondedAt || '',
});

const readComplaints = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PUBLIC_COMPLAINTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeComplaint);
  } catch (error) {
    return [];
  }
};

const writeComplaints = (items) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PUBLIC_COMPLAINTS_KEY, JSON.stringify(items.map(normalizeComplaint)));
};

export const getPublicComplaints = () =>
  readComplaints().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

export const savePublicComplaint = ({ complaint, files }) => {
  const current = readComplaints();
  const nextComplaint = normalizeComplaint({
    complaintId: `CMP-${Date.now()}`,
    complaint,
    files,
    submittedAt: new Date().toISOString(),
    status: 'Open',
  });

  writeComplaints([nextComplaint, ...current]);
  return nextComplaint;
};

export const respondToComplaint = (complaintId, responseText) => {
  const updated = readComplaints().map((item) =>
    item.complaintId === complaintId
      ? { ...item, status: 'Responded', response: responseText, respondedAt: new Date().toISOString() }
      : item
  );
  writeComplaints(updated);
  return updated.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
};
