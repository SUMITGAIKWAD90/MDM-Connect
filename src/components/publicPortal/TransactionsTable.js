import StatusBadge from '../shared/StatusBadge';

const formatAmount = (amountInr) => {
  const asNumber = Number(amountInr);
  if (Number.isFinite(asNumber)) {
    return `Rs.${asNumber.toLocaleString('en-IN')}`;
  }
  return amountInr ? `Rs.${amountInr}` : '-';
};

const TransactionsTable = ({ results, selectedTxId, onSelect }) => {
  return (
    <article className="card">
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>School ID</th>
              <th>Purpose</th>
              <th>Amount (INR)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={item.txId} onClick={() => onSelect(item)} className={selectedTxId === item.txId ? 'active-row' : ''}>
                <td>{index + 1}</td>
                <td className="mono">{item.schoolId}</td>
                <td>{item.purpose}</td>
                <td>{formatAmount(item.amountInr)}</td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default TransactionsTable;
