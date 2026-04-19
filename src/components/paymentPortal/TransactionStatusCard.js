import { CheckCircle2, CreditCard, ExternalLink } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const TransactionStatusCard = ({ receipt }) => {
  return (
    <aside className="card info-panel">
      <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
        Transaction Status
      </h3>

      {receipt ? (
        <>
          <div className="section-divider" />
          <div style={{ marginBottom: '0.8rem' }}>
            <StatusBadge status={receipt.status} />
            <span style={{ marginLeft: '0.45rem', verticalAlign: 'middle' }}>
              <CheckCircle2 size={14} />
            </span>
          </div>

          <dl>
            <div>
              <dt>Transaction Hash</dt>
              <dd className="mono" style={{ overflowWrap: 'anywhere' }}>
                {receipt.txHash}
              </dd>
            </div>
            <div>
              <dt>Block Number</dt>
              <dd className="mono">{receipt.blockNumber}</dd>
            </div>
            <div>
              <dt>School Code</dt>
              <dd>{receipt.schoolCode}</dd>
            </div>
            <div>
              <dt>Students</dt>
              <dd>{receipt.students}</dd>
            </div>
            <div>
              <dt>Purpose</dt>
              <dd>{receipt.purpose}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>
                {receipt.amountInr ? `Rs.${receipt.amountInr}` : '-'}
                {receipt.amountPol ? ` (~${receipt.amountPol} POL)` : ''}
              </dd>
            </div>
            <div>
              <dt>Transferred At</dt>
              <dd>{receipt.timestamp}</dd>
            </div>
          </dl>

          <a href={receipt.explorer} className="read-more" target="_blank" rel="noreferrer" style={{ marginTop: '0.8rem' }}>
            <ExternalLink size={14} /> View on Explorer
          </a>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '2.2rem 0' }}>
          <CreditCard size={44} style={{ marginInline: 'auto', color: 'var(--color-muted)' }} />
          <p style={{ marginTop: '0.8rem' }}>Awaiting Transfer</p>
          <p>Complete the form and initiate transfer to see status.</p>
        </div>
      )}
    </aside>
  );
};

export default TransactionStatusCard;
