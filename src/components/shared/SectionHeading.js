const SectionHeading = ({ title, subtitle, center = false, className = '' }) => {
  return (
    <header className={className} style={center ? { textAlign: 'center' } : undefined}>
      <h3 className="section-title">{title}</h3>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </header>
  );
};

export default SectionHeading;
