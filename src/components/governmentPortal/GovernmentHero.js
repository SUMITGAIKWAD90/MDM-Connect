import { Landmark } from 'lucide-react';
import AshokaWatermark from '../AshokaWatermark';

const GovernmentHero = () => {
  return (
    <section className="hero hero--navy">
      <div className="container hero__content" style={{ paddingBottom: '3rem' }}>
        <h2 className="hero__title">Government Control Room</h2>
        <p className="hero__subtitle">
          Review school fund requests, process payments, resolve public complaints, and monitor PM POSHAN updates.
        </p>
        <div className="hero__chips">
          <span className="tag tag-success">
            <Landmark size={14} /> District + State Monitoring
          </span>
        </div>
      </div>
      <AshokaWatermark />
    </section>
  );
};

export default GovernmentHero;
