import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GOVERNMENT_EMAIL } from '../config/authConfig';
import AboutCardsSection from '../components/home/AboutCardsSection';
import NewsSection from '../components/home/NewsSection';
import ResolutionsSection from '../components/home/ResolutionsSection';
import PageLayout from '../components/PageLayout';
import ComplaintResponseCard from '../components/governmentPortal/ComplaintResponseCard';
import { getSchoolRequests, setSchoolRequestStatus } from '../components/governmentPortal/dataStore';
import GovernmentHero from '../components/governmentPortal/GovernmentHero';
import SchoolRequestsCard from '../components/governmentPortal/SchoolRequestsCard';
import { purposeOptions } from '../components/paymentPortal/constants';
import { getPublicComplaints, respondToComplaint } from '../components/publicPortal/complaintsStore';
import { auth } from '../firebase';

const GovernmentHome = () => {
  const navigate = useNavigate();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [responseDrafts, setResponseDrafts] = useState({});

  const purposeLabelToValue = useMemo(
    () =>
      purposeOptions.reduce((acc, item) => {
        acc[item.label.toLowerCase()] = item.value;
        return acc;
      }, {}),
    []
  );

  const loadGovernmentData = useCallback(() => {
    setRequests(getSchoolRequests());
    setComplaints(getPublicComplaints());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAllowed(Boolean(user && user.email === GOVERNMENT_EMAIL));
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadGovernmentData();
    const onFocus = () => loadGovernmentData();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [loadGovernmentData]);

  if (isAuthChecking) {
    return null;
  }

  if (!isAllowed) {
    return <Navigate to="/gov-login" replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/gov-login', { replace: true });
  };

  const handleApproveAndPay = (request) => {
    const updated = setSchoolRequestStatus(request.requestId, 'Approved');
    setRequests(updated);

    const purposeValue = purposeLabelToValue[String(request.purpose || '').toLowerCase()] || purposeOptions[0].value;

    navigate('/payment', {
      state: {
        prefill: {
          schoolCode: request.schoolId,
          studentCount: request.studentCount,
          purpose: purposeValue,
          toAddress: request.toAddress,
          amount: request.amountInr,
        },
        sourceRequestId: request.requestId,
      },
    });
  };

  const handleReject = (requestId) => {
    const updated = setSchoolRequestStatus(requestId, 'Rejected');
    setRequests(updated);
  };

  const handleDraftChange = (complaintId, value) => {
    setResponseDrafts((prev) => ({ ...prev, [complaintId]: value }));
  };

  const handleRespond = (complaintId) => {
    const responseText = (responseDrafts[complaintId] || '').trim();
    if (!responseText) return;
    const updated = respondToComplaint(complaintId, responseText);
    setComplaints(updated);
    setResponseDrafts((prev) => ({ ...prev, [complaintId]: '' }));
  };

  return (
    <PageLayout>
      <GovernmentHero />

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
          <SchoolRequestsCard requests={requests} onApproveAndPay={handleApproveAndPay} onReject={handleReject} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <ComplaintResponseCard
            complaints={complaints}
            drafts={responseDrafts}
            onDraftChange={handleDraftChange}
            onRespond={handleRespond}
          />
        </div>
      </section>

      <AboutCardsSection />
      <NewsSection />
      <ResolutionsSection />
    </PageLayout>
  );
};

export default GovernmentHome;
