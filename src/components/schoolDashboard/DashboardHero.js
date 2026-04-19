const DashboardHero = ({ school }) => {
  return (
    <section className="hero">
      <div className="container hero__content" style={{ paddingBottom: '2.7rem' }}>
        <h2 className="hero__title">Welcome, {school?.schoolName || 'School Portal'}</h2>
        <p className="hero__subtitle">Submit and track PM POSHAN fund requests and status updates.</p>
        <div className="hero__chips">
          <span className="stat-chip">UDISE: {school?.udiseCode || '-'}</span>
          <span className="stat-chip">Status: Active</span>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
