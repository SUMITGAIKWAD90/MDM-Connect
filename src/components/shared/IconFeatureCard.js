import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IconFeatureCard = ({ icon: Icon, tone = 'primary', title, description, linkTo, linkLabel = 'Read More' }) => {
  return (
    <article className="card">
      <div className={`icon-bubble icon-bubble--${tone}`}>
        <Icon size={20} />
      </div>
      <h4 className="card-title">{title}</h4>
      <p className="card-desc">{description}</p>
      {linkTo ? (
        <Link to={linkTo} className="read-more">
          {linkLabel} <ArrowRight size={14} />
        </Link>
      ) : null}
    </article>
  );
};

export default IconFeatureCard;
