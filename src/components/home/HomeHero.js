import { Link } from 'react-router-dom';
import AshokaWatermark from '../AshokaWatermark';

const HomeHero = () => {
  return (
    <section className="hero">
      <div className="container hero__content">
        <h2 className="hero__title">Nourishing India&apos;s Future, One Meal at a Time</h2>
        <p className="hero__subtitle">
          PM POSHAN (Pradhan Mantri Poshan Shakti Nirman) ensures hot, nutritious meals for over 12 crore children across
          India, fostering health, education and equality.
        </p>
        <div className="hero__actions">
          <Link to="/public" className="btn">
            View Transparency Portal
          </Link>
          <Link to="/gov-login" className="btn-outline">
            Government Login
          </Link>
          <Link to="/register" className="btn-outline">
            School Registration
          </Link>
        </div>
        <div className="hero__chips">
          <span className="stat-chip">12.5 Cr Children</span>
          <span className="stat-chip">11.2 L Schools</span>
          <span className="stat-chip">?12,467 Cr Budget</span>
        </div>
      </div>
      <AshokaWatermark />
    </section>
  );
};

export default HomeHero;
