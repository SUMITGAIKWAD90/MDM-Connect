import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationSuccessCard = ({ udiseCode }) => {
  return (
    <section className="section">
      <div className="container">
        <article className="card" style={{ maxWidth: '760px', marginInline: 'auto', textAlign: 'center' }}>
          <CheckCircle2 size={52} style={{ color: 'var(--color-secondary)', marginInline: 'auto' }} />
          <h2 className="section-title" style={{ marginTop: '0.8rem' }}>
            School Registration Completed
          </h2>
          <p>Your school account has been created successfully.</p>
          <p className="pending-pill" style={{ marginTop: '0.8rem' }}>
            <ShieldAlert size={14} /> Ready For Sign In
          </p>
          <p style={{ marginTop: '1rem' }}>
            UDISE Code: <span className="mono">{udiseCode}</span>
          </p>
          <Link to="/school-login" className="btn" style={{ display: 'inline-flex', marginTop: '1rem' }}>
            Go To School Login
          </Link>
        </article>
      </div>
    </section>
  );
};

export default RegistrationSuccessCard;
