import PasswordStrengthMeter from './PasswordStrengthMeter';

const CredentialsSection = ({ formData, errors, onChange, passwordStrength }) => {
  return (
    <section style={{ marginTop: '1.2rem' }}>
      <h3 className="card-title">3. Credentials</h3>
      <div className="grid-2" style={{ marginTop: '0.8rem' }}>
        <div className="field-group">
          <label className="field-label">Head Master Name</label>
          <input name="headName" value={formData.headName} onChange={onChange} placeholder="Enter full name" />
          {errors.headName ? <p className="error-text">{errors.headName}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">School Email</label>
          <input name="schoolEmail" type="email" value={formData.schoolEmail} onChange={onChange} placeholder="school@example.com" />
          {errors.schoolEmail ? <p className="error-text">{errors.schoolEmail}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">Password</label>
          <input name="password" type="password" value={formData.password} onChange={onChange} placeholder="Create secure password" />
          <PasswordStrengthMeter score={passwordStrength} />
          {errors.password ? <p className="error-text">{errors.password}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Re-enter password"
          />
          {errors.confirmPassword ? <p className="error-text">{errors.confirmPassword}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
