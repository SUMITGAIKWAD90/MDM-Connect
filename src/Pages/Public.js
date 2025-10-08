import { useState } from 'react';
import Footer from '../components/Footer';
import HeaderMain from '../components/Headermain';
import Txstatus from '../components/Txstatus';

// Use centralized firebase exports from src/firebase.js
import { ref, set } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { database, storage } from '../firebase';

const PublicPage = () => {
  // Search inputs
  const [udise, setUdise] = useState('');
  const [schoolName, setSchoolName] = useState('');

  // Transactions
  const [isSearching, setIsSearching] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchError, setSearchError] = useState('');

  // Complaint form
  const [complaintText, setComplaintText] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [complaintStatus, setComplaintStatus] = useState('');

  // No local firebase init needed: we import `db` and `storage` from src/firebase.js

  // Try to load a transactions.json from public/transactions.json as an easy integration path.
  // If not present, we'll use a small sample dataset so the UI can be tested immediately.
  const sampleTransactions = [
    {
      schoolName: 'ZP School, Pune',
      schoolId: 'MH-12345',
      transactionId: '0xabc123def',
      fundAllocation: 'Meal Preparation Funds',
      amount: '2.50',
      date: '2025-09-10'
    },
    {
      schoolName: 'ZP School, Pune',
      schoolId: 'MH-12345',
      transactionId: '0xdef456ghi',
      fundAllocation: 'Vegetables',
      amount: '1.20',
      date: '2025-09-15'
    }
  ];

  const fetchTransactions = async (udiseQuery, nameQuery) => {
    setIsSearching(true);
    setSearchError('');
    setTransactions([]);
    setSelectedSchool('');

    try {
      // Primary: try to fetch a static json placed in public/transactions.json
      const res = await fetch('/transactions.json');
      if (res.ok) {
        const all = await res.json();
        // basic filtering
        const filtered = all.filter((t) => {
          const matchesUdise = udiseQuery ? (t.schoolId || '').toLowerCase().includes(udiseQuery.toLowerCase()) : true;
          const matchesName = nameQuery ? (t.schoolName || '').toLowerCase().includes(nameQuery.toLowerCase()) : true;
          return matchesUdise && matchesName;
        });
        setTransactions(filtered);
        if (filtered.length) setSelectedSchool(filtered[0].schoolName || '');
        // if txs available, select first for detail view by default
        if (filtered.length) setSelectedTxDetails(mapToTxDetails(filtered[0]));
      } else {
        // fallback to sample dataset
        const filtered = sampleTransactions.filter((t) => {
          const matchesUdise = udiseQuery ? (t.schoolId || '').toLowerCase().includes(udiseQuery.toLowerCase()) : true;
          const matchesName = nameQuery ? (t.schoolName || '').toLowerCase().includes(nameQuery.toLowerCase()) : true;
          return matchesUdise && matchesName;
        });
        setTransactions(filtered);
        if (filtered.length) setSelectedSchool(filtered[0].schoolName || '');
        if (filtered.length) setSelectedTxDetails(mapToTxDetails(filtered[0]));
        if (!filtered.length) setSearchError('No transactions found (no /transactions.json present and sample did not match).');
      }
    } catch (err) {
      console.error('Fetch transactions error:', err);
      setTransactions(sampleTransactions);
      setSelectedSchool(sampleTransactions.length ? sampleTransactions[0].schoolName : '');
      setSearchError('Could not fetch /transactions.json — showing sample data. Replace with your real data source for production.');
    } finally {
      setIsSearching(false);
    }
  };

  // paymentPurposes mapping - reused by Txstatus. Map human-readable fund names to themselves
  const paymentPurposes = {
    'Meal Preparation Funds': 'Meal Preparation Funds',
    'Kitchen Infrastructure': 'Kitchen Infrastructure',
    'Cooking Utensils & Equipment': 'Cooking Utensils & Equipment',
    'Cooking Gas/Fuel': 'Cooking Gas/Fuel',
    'Fresh Vegetables & Groceries': 'Fresh Vegetables & Groceries',
    'Rice, Wheat & Grains': 'Rice, Wheat & Grains'
  };

  // selected transaction detail for Txstatus
  const [selectedTxDetails, setSelectedTxDetails] = useState(null);

  const mapToTxDetails = (t) => {
    if (!t) return null;
    const txHash = t.transactionId || t.transactionHash || '';
    const explorer = txHash ? `https://polygonscan.com/tx/${txHash}` : '';
    return {
      transactionHash: txHash,
      blockNumber: t.blockNumber || '-',
      status: t.status || 'Confirmed',
      explorer: explorer,
      schoolCode: t.schoolId || '',
      studentCount: t.studentCount || '-',
      paymentPurpose: t.fundAllocation || t.paymentPurpose || '',
      amount: t.amount || ''
    };
  };

  // Complaint handling helpers
  const onFilesChange = (e) => {
    setMediaFiles(Array.from(e.target.files || []));
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setComplaintStatus('');

    if (!complaintText.trim() && mediaFiles.length === 0) {
      setComplaintStatus('Please enter a complaint or attach media.');
      return;
    }

    try {
      console.log('Submitting complaint. text length:', complaintText.length, 'files:', mediaFiles.length);

      // Upload files (if any) to Firebase Storage
      const uploadedUrls = [];
      for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        const fileRef = storageRef(storage, `public-complaints/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        // Wait for upload to f        git add src/Pages/Public.js src/firebase.js src/components/PaymentForm.js src/App.js package.json package-lock.jsoninish and track progress
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(pct);
            },
            (error) => {
              console.error('Upload error', error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                if (url) {
                  uploadedUrls.push(url);
                }
                resolve(url);
              } catch (gerr) {
                console.error('getDownloadURL failed for', file.name, gerr);
                resolve(null);
              }
            }
          );
        });
      }

      // Save complaint doc in Firestore. We keep the complaint anonymous: do NOT store user-identifying fields.
      // Ensure we don't save completely empty content
     // Save complaint to Realtime Database
      const finalText = complaintText.trim();
      const finalMedia = uploadedUrls.filter(Boolean);
      
      if (!finalText && finalMedia.length === 0) {
        setComplaintStatus('Nothing to save after uploads failed or empty text provided.');
        return;
      }

      const timestamp = Date.now();
      const complaintId = `complaint_${timestamp}`;
      
      const complaintData = {
        complaint: finalText,
        media: finalMedia,
        timestamp: timestamp,
        date: new Date().toISOString(),
        status: 'pending',
        anonymous: true
      };

      const complaintsRef = ref(database, `complaints/${complaintId}`);
      await set(complaintsRef, complaintData);

      console.log('Complaint saved. media urls count:', uploadedUrls.length);
      setComplaintStatus('Complaint submitted successfully (anonymous). Thank you.');
      setComplaintText('');
      setMediaFiles([]);
      setUploadProgress(null);
    } catch (err) {
      console.error('Complaint submission error:', err);
      setComplaintStatus('Failed to submit complaint — check console and Firebase configuration.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50">
      <HeaderMain />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Public Transaction</h2>

          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">UDISE Number</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                placeholder="Enter Maharashtra UDISE (e.g. MH-12345)"
                value={udise}
                onChange={(e) => setUdise(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                placeholder="Enter school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={() => fetchTransactions(udise.trim(), schoolName.trim())}
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {searchError && <p className="mt-3 text-sm text-red-600">{searchError}</p>}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          {selectedSchool && <div className="mb-3 text-lg font-semibold">School: {selectedSchool}</div>}

          {transactions.length ? (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Sr. No.</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">School ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Transaction ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fund Allocation</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((t, idx) => (
                      <tr key={t.transactionId || idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTxDetails(mapToTxDetails(t))}>
                        <td className="px-4 py-2 text-sm text-gray-700">{idx + 1}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{t.schoolId}</td>
                        <td className="px-4 py-2 text-sm text-blue-600 break-all">{t.transactionId}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{t.fundAllocation}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{t.amount}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <Txstatus txDetails={selectedTxDetails} paymentPurposes={paymentPurposes} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No transactions to display. Use the search above.</p>
          )}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Anonymous Complaint Box</h3>
          <p className="text-sm text-gray-600 mb-4">Submit your complaint anonymously. You may also attach images or a short video to support your concern.</p>

          <form onSubmit={handleComplaintSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Complaint</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder="Describe the issue (do not include your name or identifying information)."
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Attach images or video (optional)</label>
              <input type="file" multiple accept="image/*,video/*" onChange={onFilesChange} className="mt-1" />
              {mediaFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-700">Selected: {mediaFiles.map((f) => f.name).join(', ')}</div>
              )}
            </div>

            {uploadProgress !== null && (
              <div className="mt-3">
                <div className="text-sm">Upload progress: {uploadProgress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700">Submit Complaint</button>
              <button
                type="button"
                onClick={() => { setComplaintText(''); setMediaFiles([]); setComplaintStatus(''); setUploadProgress(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Reset
              </button>
            </div>

            {complaintStatus && <div className="mt-3 text-sm text-gray-700">{complaintStatus}</div>}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PublicPage;
