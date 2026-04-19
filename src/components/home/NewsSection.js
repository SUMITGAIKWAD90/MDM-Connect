import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import SectionHeading from '../shared/SectionHeading';
import { newsItems } from './constants';

const NewsSection = () => {
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((current) => (current + 1) % newsItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const activeNews = newsItems[currentNews];

  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading title="Latest News & Updates" center />
        <div className="card carousel">
          <article className="carousel-card">
            <div className="carousel-meta">
              <span>{activeNews.date}</span>
              <span className="tag tag-primary">{activeNews.category}</span>
            </div>
            <h4 className="card-title">{activeNews.title}</h4>
            <p style={{ marginTop: '0.5rem' }}>{activeNews.summary}</p>
            <a href="/" className="read-more">
              Read More <ArrowRight size={14} />
            </a>
          </article>

          <div className="progress-line" aria-hidden="true">
            <span style={{ width: `${((currentNews + 1) / newsItems.length) * 100}%` }} />
          </div>

          <div className="dot-row">
            {newsItems.map((item, index) => (
              <button
                key={item.title}
                className={`dot${index === currentNews ? ' active' : ''}`}
                type="button"
                onClick={() => setCurrentNews(index)}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
