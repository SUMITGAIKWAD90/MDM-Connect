import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GOVERNMENT_EMAIL } from '../config/authConfig';
import PageLayout from '../components/PageLayout';
import { createSchoolRequest, getSchoolRequests } from '../components/governmentPortal/dataStore';
import { purposeOptions } from '../components/paymentPortal/constants';
import DashboardHero from '../components/schoolDashboard/DashboardHero';
import DashboardNotice from '../components/schoolDashboard/DashboardNotice';
import MetricsSection from '../components/schoolDashboard/MetricsSection';
import StatusBadge from '../components/shared/StatusBadge';
import { auth, db } from '../firebase';

const Schooldashboard = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileWarning, setProfileWarning] = useState('');
  const [formData, setFormData] = useState({
    purpose: purposeOptions[0].label,
    amountInr: '',
    studentCount: '',
    toAddress: '',
    notes: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setSchool(null);
        setIsAuthChecking(false);
        return;
      }

      if (user.email === GOVERNMENT_EMAIL) {
        setSchool(null);
        setIsAuthChecking(false);
        return;
      }

      try {
        const schoolDoc = await getDoc(doc(db, 'schools', user.uid));
        if (!schoolDoc.exists()) {
          const fallbackSchool = {
            uid: user.uid,
            schoolEmail: user.email || '',
            schoolName: user.email ? `School ${user.email.split('@')[0]}` : 'School Portal',
            udiseCode: user.uid.slice(0, 11).toUpperCase(),
            role: 'school',
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'schools', user.uid), fallbackSchool, { merge: true });
          setSchool(fallbackSchool);
          setProfileWarning('School profile was missing and has been initialized. Please verify school details later.');
          setIsAuthChecking(false);
          return;
        }

        setProfileWarning('');
        setSchool({ uid: user.uid, ...schoolDoc.data() });
      } catch (schoolError) {
        setProfileWarning('Unable to load full school profile right now. Showing portal with basic account details.');
        setSchool({
          uid: user.uid,
          schoolEmail: user.email || '',
          schoolName: user.email ? `School ${user.email.split('@')[0]}` : 'School Portal',
          udiseCode: user.uid.slice(0, 11).toUpperCase(),
          role: 'school',
        });
      } finally {
        setIsAuthChecking(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!school?.udiseCode) return;
    const all = getSchoolRequests();
    setRequests(all.filter((item) => item.schoolId === school.udiseCode));
  }, [school]);

  const metrics = useMemo(() => {
    const approved = requests.filter((item) => item.status === 'Approved').length;
    const pending = requests.filter((item) => item.status === 'Pending').length;
    const rejected = requests.filter((item) => item.status === 'Rejected').length;
    const latestApproved = requests.find((item) => item.status === 'Approved');

    return [
      { title: 'Requests Submitted', value: String(requests.length) },
      { title: 'Pending Approvals', value: String(pending) },
      { title: 'Approved Requests', value: String(approved) },
      { title: 'Rejected Requests', value: String(rejected) },
      { title: 'Latest Approved Amount', value: latestApproved ? `Rs.${Number(latestApproved.amountInr).toLocaleString('en-IN')}` : '-' },
    ];
  }, [requests]);

  if (isAuthChecking) {
    return null;
  }

  if (!school) {
    return <Navigate to="/school-login" replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/school-login', { replace: true });
  };

  const refreshSchoolRequests = () => {
    const all = getSchoolRequests();
    setRequests(all.filter((item) => item.schoolId === school.udiseCode));
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.amountInr || Number(formData.amountInr) <= 0 || Number.isNaN(Number(formData.amountInr))) {
      setError('Enter a valid request amount in INR.');
      return;
    }

    if (!formData.studentCount || Number(formData.studentCount) <= 0 || Number.isNaN(Number(formData.studentCount))) {
      setError('Enter a valid student count.');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(formData.toAddress.trim())) {
      setError('Enter a valid 42-character wallet address.');
      return;
    }

    const created = createSchoolRequest({
      schoolId: school.udiseCode,
      schoolName: school.schoolName,
      purpose: formData.purpose,
      amountInr: String(formData.amountInr).trim(),
      studentCount: String(formData.studentCount).trim(),
      toAddress: formData.toAddress.trim(),
      notes: formData.notes.trim(),
    });

    refreshSchoolRequests();
    setSuccessMessage(`Request ${created.requestId} submitted to Government portal.`);
    setFormData((prev) => ({ ...prev, amountInr: '', studentCount: '', toAddress: '', notes: '' }));
  };

  return (
    <PageLayout>
      <DashboardHero school={school} />

      <section className="section section-hero-card">
        <div className="container">
          <div className="actions-row" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <MetricsSection metrics={metrics} />
          <DashboardNotice />

          <div className="grid-2" style={{ alignItems: 'start', marginTop: '1rem' }}>
            <article className="card">
              <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
                Submit Fund Request
              </h3>
              <p className="section-subtitle">This request will be visible to Government officers for approval.</p>

              <form onSubmit={handleRequestSubmit}>
                <div className="field-group">
                  <label className="field-label">School ID</label>
                  <input value={school.udiseCode} readOnly />
                </div>

                <div className="field-group">
                  <label className="field-label">Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(event) => setFormData((prev) => ({ ...prev, purpose: event.target.value }))}
                  >
                    {purposeOptions.map((item) => (
                      <option key={item.value} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Amount (INR)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amountInr}
                    onChange={(event) => setFormData((prev) => ({ ...prev, amountInr: event.target.value }))}
                    placeholder="e.g. 50000"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Student Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.studentCount}
                    onChange={(event) => setFormData((prev) => ({ ...prev, studentCount: event.target.value }))}
                    placeholder="e.g. 450"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">School Wallet Address</label>
                  <input
                    className="mono"
                    value={formData.toAddress}
                    onChange={(event) => setFormData((prev) => ({ ...prev, toAddress: event.target.value }))}
                    placeholder="0x..."
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
                    placeholder="Enter reason/details for this request"
                  />
                </div>

                {error ? <p className="error-text">{error}</p> : null}
                {profileWarning ? <p className="helper">{profileWarning}</p> : null}
                {successMessage ? <p className="helper">{successMessage}</p> : null}

                <div className="actions-row" style={{ marginTop: '0.8rem' }}>
                  <button className="btn-success" type="submit">
                    Submit Request
                  </button>
                </div>
              </form>
            </article>

            <article className="card info-panel">
              <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
                Request Status
              </h3>
              {requests.length ? (
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Request ID</th>
                        <th>Purpose</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((item) => (
                        <tr key={item.requestId}>
                          <td className="mono">{item.requestId}</td>
                          <td>{item.purpose}</td>
                          <td>{`Rs.${Number(item.amountInr).toLocaleString('en-IN')}`}</td>
                          <td>{item.requestDate}</td>
                          <td>
                            <StatusBadge status={item.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No requests submitted yet.</p>
              )}
            </article>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Schooldashboard;
