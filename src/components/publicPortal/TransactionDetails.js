import { CheckCircle2, Shield, ShieldAlert } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const TransactionDetails = ({ selected }) => {
  const formatAmount = (amountInr) => {
    const asNumber = Number(amountInr);
    if (Number.isFinite(asNumber)) {
      return `Rs.${asNumber.toLocaleString('en-IN')}`;
    }
    return amountInr ? `Rs.${amountInr}` : '-';
  };

  const getStatusIcon = () => {
    if (!selected) return null;
    if (selected.status === 'Confirmed') return <CheckCircle2 size={16} />;
    if (selected.status === 'Pending') return <Shield size={16} />;
    return <ShieldAlert size={16} />;
  };

  return (
    <aside className="card info-panel">
      <h3 className="card-title">Transaction Detail</h3>
      {selected ? (
        <>
          <div className="section-divider" />
          <dl>
            <div>
              <dt>School</dt>
              <dd>{selected.schoolName}</dd>
            </div>
            <div>
              <dt>Transaction ID</dt>
              <dd className="mono" style={{ overflowWrap: 'anywhere' }}>
                {selected.txId}
              </dd>
            </div>
            <div>
              <dt>Block Number</dt>
              <dd className="mono">{selected.block}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {getStatusIcon()}
                <StatusBadge status={selected.status} />
              </dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>
                {formatAmount(selected.amountInr)}
                {selected.amountPol ? ` (~${selected.amountPol} POL)` : ''}
              </dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{selected.date}</dd>
            </div>
          </dl>
        </>
      ) : (
        <p>No records match this search.</p>
      )}
    </aside>
  );
};

export default TransactionDetails;
