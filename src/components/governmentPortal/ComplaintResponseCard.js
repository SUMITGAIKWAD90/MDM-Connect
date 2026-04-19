import { MessageSquare } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const ComplaintResponseCard = ({ complaints, drafts, onDraftChange, onRespond }) => {
  return (
    <article className="card">
      <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
        Public Complaint Responses
      </h3>
      <p className="section-subtitle">Handle anonymous complaints received from the public portal.</p>

      {complaints.length ? (
        <div style={{ display: 'grid', gap: '0.9rem' }}>
          {complaints.map((item) => (
            <div key={item.complaintId} className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.65rem', flexWrap: 'wrap' }}>
                <div>
                  <p className="mono" style={{ color: 'var(--color-fg)', fontSize: '0.86rem' }}>
                    {item.complaintId}
                  </p>
                  <p className="helper">
                    {new Date(item.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <p style={{ marginTop: '0.6rem', color: 'var(--color-fg)' }}>
                <MessageSquare size={14} style={{ marginRight: '0.35rem', display: 'inline' }} />
                {item.complaint}
              </p>

              {item.files?.length ? (
                <p className="helper" style={{ marginTop: '0.4rem' }}>
                  Evidence: {item.files.join(', ')}
                </p>
              ) : null}

              {item.status === 'Responded' ? (
                <p className="helper" style={{ marginTop: '0.5rem' }}>
                  Response: {item.response}
                </p>
              ) : (
                <div style={{ marginTop: '0.7rem' }}>
                  <textarea
                    rows={2}
                    placeholder="Type response for this complaint..."
                    value={drafts[item.complaintId] || ''}
                    onChange={(event) => onDraftChange(item.complaintId, event.target.value)}
                  />
                  <div className="actions-row" style={{ marginTop: '0.55rem' }}>
                    <button type="button" className="btn-success" onClick={() => onRespond(item.complaintId)}>
                      Submit Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No complaints submitted from public portal yet.</p>
      )}
    </article>
  );
};

export default ComplaintResponseCard;
