const TermsSection = ({ formData, errors, onChange }) => {
  return (
    <section style={{ marginTop: '1.2rem' }}>
      <h3 className="card-title">4. Terms</h3>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', marginTop: '0.75rem' }}>
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={onChange}
          style={{ width: '18px', height: '18px', marginTop: '2px' }}
        />
        <span>
          I confirm all provided details are accurate and agree to PM POSHAN Terms, Privacy Policy and audit verification.
        </span>
      </label>
      {errors.agreeTerms ? <p className="error-text">{errors.agreeTerms}</p> : null}
    </section>
  );
};

export default TermsSection;
