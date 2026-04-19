import { Bell } from 'lucide-react';

const DashboardNotice = () => {
  return (
    <article className="banner" style={{ marginTop: '1rem' }}>
      <p style={{ color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <Bell size={16} /> Next reconciliation upload window closes on 22 March 2026, 5:30 PM IST.
      </p>
    </article>
  );
};

export default DashboardNotice;
