import { School } from 'lucide-react';
import AsyncButton from '../shared/AsyncButton';
import CredentialsSection from './CredentialsSection';
import LocationSection from './LocationSection';
import SchoolIdentificationSection from './SchoolIdentificationSection';
import TermsSection from './TermsSection';

const SchoolRegistrationForm = ({ formData, errors, onChange, onSubmit, passwordStrength, isSubmitting }) => {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        <article className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <School size={20} color="var(--color-primary)" /> School Registration
          </h2>
          <p className="section-subtitle">Complete all sections to register your school in PM POSHAN.</p>
          <div className="section-divider" />

          <form onSubmit={onSubmit}>
            <SchoolIdentificationSection formData={formData} errors={errors} onChange={onChange} />
            <LocationSection formData={formData} errors={errors} onChange={onChange} />
            <CredentialsSection
              formData={formData}
              errors={errors}
              onChange={onChange}
              passwordStrength={passwordStrength}
            />
            <TermsSection formData={formData} errors={errors} onChange={onChange} />

            {errors.submit ? <p className="error-text" style={{ marginTop: '0.75rem' }}>{errors.submit}</p> : null}

            <AsyncButton
              className="btn-success"
              type="submit"
              loading={isSubmitting}
              loadingLabel="Registering School"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '1.2rem' }}
            >
              Register School
            </AsyncButton>
          </form>
        </article>
      </div>
    </section>
  );
};

export default SchoolRegistrationForm;
