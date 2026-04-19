const PaymentHero = () => {
  return (
    <section className="hero hero--navy">
      <div className="container hero__content" style={{ paddingBottom: '3rem' }}>
        <h2 className="hero__title">Digital Payment Portal</h2>
        <p className="hero__subtitle">Secure blockchain-based fund transfer to schools.</p>
        <div className="hero__chips">
          <span className="stat-chip">Polygon Network</span>
          <span className="stat-chip">Transparent</span>
          <span className="stat-chip">Traceable</span>
        </div>
      </div>
    </section>
  );
};

export default PaymentHero;
