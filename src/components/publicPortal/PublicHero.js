import { Shield } from 'lucide-react';
import AshokaWatermark from '../AshokaWatermark';

const PublicHero = () => {
  return (
    <section className="hero hero--navy">
      <div className="container hero__content" style={{ paddingBottom: '3rem' }}>
        <h2 className="hero__title">Public Transparency Portal</h2>
        <p className="hero__subtitle">Track government fund transfers to schools in real time.</p>
        <div className="hero__chips">
          <span className="tag tag-success">
            <Shield size={14} /> Blockchain Verified
          </span>
        </div>
      </div>
      <AshokaWatermark />
    </section>
  );
};

export default PublicHero;
