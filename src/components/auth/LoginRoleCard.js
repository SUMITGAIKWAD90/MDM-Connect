import { Link } from 'react-router-dom';

const LoginRoleCard = ({ icon: Icon, tone, title, description, ctaText, to, buttonClass }) => {
  return (
    <article className="card" style={{ textAlign: 'center' }}>
      <div className={`icon-bubble icon-bubble--${tone}`} style={{ marginInline: 'auto' }}>
        <Icon size={22} />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
      <Link to={to} className={buttonClass} style={{ display: 'inline-flex', marginTop: '1rem' }}>
        {ctaText}
      </Link>
    </article>
  );
};

export default LoginRoleCard;
