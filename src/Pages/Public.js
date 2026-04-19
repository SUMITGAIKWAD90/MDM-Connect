import { useCallback, useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import ComplaintFormSection from '../components/publicPortal/ComplaintFormSection';
import PublicHero from '../components/publicPortal/PublicHero';
import SearchCard from '../components/publicPortal/SearchCard';
import { getPublicTransactions } from '../components/publicPortal/constants';
import { savePublicComplaint } from '../components/publicPortal/complaintsStore';
import TransactionDetails from '../components/publicPortal/TransactionDetails';
import TransactionsTable from '../components/publicPortal/TransactionsTable';

const PublicPage = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [udise, setUdise] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const [complaint, setComplaint] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const loadTransactions = useCallback(() => {
    const all = getPublicTransactions();
    setAllTransactions(all);
    setResults(all);
    setSelected(all[0] || null);
  }, []);

  useEffect(() => {
    loadTransactions();

    const onFocus = () => {
      loadTransactions();
    };

    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [loadTransactions]);

  const searchTransactions = async () => {
    setIsSearching(true);
    setSubmitMessage('');

    await new Promise((resolve) => setTimeout(resolve, 600));

    const filtered = allTransactions.filter((item) => {
      const udiseMatch = udise.trim() ? item.schoolId.toLowerCase().includes(udise.trim().toLowerCase()) : true;
      const nameMatch = schoolName.trim()
        ? item.schoolName.toLowerCase().includes(schoolName.trim().toLowerCase())
        : true;
      return udiseMatch && nameMatch;
    });

    setResults(filtered);
    setSelected(filtered[0] || null);
    setIsSearching(false);
  };

  const handleComplaintSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage('');

    if (!complaint.trim()) {
      setSubmitMessage('Please describe the issue before submitting.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const savedComplaint = savePublicComplaint({
      complaint: complaint.trim(),
      files: files.map((file) => file.name),
    });

    setIsSubmitting(false);
    setSubmitMessage(`Complaint submitted successfully (ID: ${savedComplaint.complaintId}). Your identity remains anonymous.`);
    setComplaint('');
    setFiles([]);
  };

  return (
    <PageLayout>
      <PublicHero />
      <SearchCard
        udise={udise}
        schoolName={schoolName}
        setUdise={setUdise}
        setSchoolName={setSchoolName}
        onSearch={searchTransactions}
        isSearching={isSearching}
      />

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <TransactionsTable results={results} selectedTxId={selected?.txId} onSelect={setSelected} />
            <TransactionDetails selected={selected} />
          </div>
        </div>
      </section>

      <ComplaintFormSection
        complaint={complaint}
        setComplaint={setComplaint}
        files={files}
        setFiles={setFiles}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        onSubmit={handleComplaintSubmit}
        onReset={() => {
          setComplaint('');
          setFiles([]);
          setSubmitMessage('');
        }}
      />
    </PageLayout>
  );
};

export default PublicPage;
