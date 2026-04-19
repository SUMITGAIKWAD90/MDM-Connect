import SectionHeading from '../shared/SectionHeading';

const MinistrySection = () => {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '920px' }}>
        <SectionHeading
          title="Ministry of Education"
          subtitle="The PM POSHAN scheme is administered by the Department of School Education & Literacy under the Ministry of Education, Government of India. The programme aims to improve enrollment, attendance, retention and nutritional outcomes among school children."
        />
        <p>
          With annual budget support and state coordination, the scheme covers all government and government-aided
          schools serving children from classes I to VIII. The Union Government supports foodgrains, while cooking costs
          are shared between Centre and States.
        </p>
      </div>
    </section>
  );
};

export default MinistrySection;
