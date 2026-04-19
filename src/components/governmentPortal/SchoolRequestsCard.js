import StatusBadge from '../shared/StatusBadge';

const formatAmount = (amountInr) => {
  const asNumber = Number(amountInr);
  if (Number.isFinite(asNumber)) {
    return `Rs.${asNumber.toLocaleString('en-IN')}`;
  }
  return amountInr ? `Rs.${amountInr}` : '-';
};

const SchoolRequestsCard = ({ requests, onApproveAndPay, onReject }) => {
  return (
    <article className="card">
      <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
        School Fund Requests
      </h3>
      <p className="section-subtitle">Approve a request to prefill payment details automatically.</p>

      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>School ID</th>
              <th>Purpose</th>
              <th>Amount (INR)</th>
              <th>Students</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length ? (
              requests.map((item) => (
                <tr key={item.requestId}>
                  <td className="mono">{item.requestId}</td>
                  <td className="mono">{item.schoolId}</td>
                  <td>{item.purpose}</td>
                  <td>{formatAmount(item.amountInr)}</td>
                  <td>{item.studentCount}</td>
                  <td>{item.requestDate}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <div className="actions-row">
                      {item.status === 'Pending' ? (
                        <>
                          <button type="button" className="btn" onClick={() => onApproveAndPay(item)}>
                            Approve & Pay
                          </button>
                          <button type="button" className="btn-ghost" onClick={() => onReject(item.requestId)}>
                            Reject
                          </button>
                        </>
                      ) : item.status === 'Approved' ? (
                        <button type="button" className="btn" onClick={() => onApproveAndPay(item)}>
                          Open Payment
                        </button>
                      ) : (
                        <span className="helper">No action</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <p className="helper">No school fund requests submitted yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default SchoolRequestsCard;
