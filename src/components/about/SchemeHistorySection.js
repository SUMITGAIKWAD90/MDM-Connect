import SectionHeading from '../shared/SectionHeading';
import { timeline } from './constants';

const SchemeHistorySection = () => {
  return (
    <section className="section section-alt">
      <div className="container" style={{ maxWidth: '920px' }}>
        <SectionHeading title="Scheme History" />
        <div className="timeline" style={{ marginTop: '1rem' }}>
          {timeline.map((item) => (
            <article key={item.year} className="timeline-item">
              <span className="timeline-dot" aria-hidden="true" />
              <p className="tag tag-primary" style={{ display: 'inline-flex' }}>
                {item.year}
              </p>
              <h4 className="card-title" style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>
                {item.title}
              </h4>
              <p style={{ marginTop: '0.25rem' }}>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchemeHistorySection;
