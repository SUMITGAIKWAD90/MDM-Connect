import SectionHeading from '../shared/SectionHeading';
import { disbursementSteps, securityItems } from './constants';

const PaymentGuidelinesSection = () => {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading title="Payment Guidelines" center />
        <div className="section-divider" />
        <div className="grid-2">
          <article className="card">
            <h4 className="card-title">Disbursement Process</h4>
            <div className="steps" style={{ marginTop: '1rem' }}>
              {disbursementSteps.map((step, index) => (
                <div className="step" key={step}>
                  <span className="step-index">{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <h4 className="card-title">Security &amp; Compliance</h4>
            <div className="security-list" style={{ marginTop: '1rem' }}>
              {securityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="security-item" key={item.title}>
                    <Icon size={18} color="var(--color-secondary)" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PaymentGuidelinesSection;
