import IconFeatureCard from '../shared/IconFeatureCard';
import SectionHeading from '../shared/SectionHeading';
import { infoCards } from './constants';

const AboutCardsSection = () => {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading title="About PM POSHAN" center />
        <div className="section-divider" />
        <div className="grid-3">
          {infoCards.map((item) => (
            <IconFeatureCard
              key={item.title}
              icon={item.icon}
              tone={item.tone}
              title={item.title}
              description={item.description}
              linkTo="/about"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCardsSection;
