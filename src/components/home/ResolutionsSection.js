import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useRef } from 'react';
import SectionHeading from '../shared/SectionHeading';
import { resolutions } from './constants';

const ResolutionsSection = () => {
  const grRef = useRef(null);

  const scrollResolutions = (direction) => {
    if (!grRef.current) return;
    const amount = direction === 'left' ? -300 : 300;
    grRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="scroll-head">
          <SectionHeading title="Government Resolutions" className="scroll-head__title" />
          <div style={{ display: 'flex', gap: '0.45rem' }}>
            <button className="icon-btn" type="button" onClick={() => scrollResolutions('left')} aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button className="icon-btn" type="button" onClick={() => scrollResolutions('right')} aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="scroll-row" ref={grRef}>
          {resolutions.map((item) => (
            <article className="card gr-card" key={item.code}>
              <p className="helper">{item.date}</p>
              <p className="read-more" style={{ marginTop: '0.4rem' }}>
                {item.code}
              </p>
              <h4 style={{ marginTop: '0.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '1rem' }}>{item.title}</h4>
              <button type="button" className="btn-ghost" style={{ marginTop: '0.9rem' }}>
                <Download size={14} style={{ marginRight: '0.35rem', display: 'inline' }} /> Download PDF
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResolutionsSection;
