import { School, ShieldCheck } from 'lucide-react';
import LoginRoleCard from '../components/auth/LoginRoleCard';
import PageLayout from '../components/PageLayout';
import SectionHeading from '../components/shared/SectionHeading';

const Login = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          <SectionHeading
            title="Choose Login Type"
            subtitle="Select your role to proceed to the appropriate portal."
            center
          />

          <div className="grid-2" style={{ marginTop: '1rem' }}>
            <LoginRoleCard
              icon={ShieldCheck}
              tone="accent"
              title="Government Official"
              description="Access disbursement and payment tracking workflows."
              to="/gov-login"
              ctaText="Continue"
              buttonClass="btn"
            />

            <LoginRoleCard
              icon={School}
              tone="secondary"
              title="School Login"
              description="View school dashboard and compliance status updates."
              to="/school-login"
              ctaText="Continue"
              buttonClass="btn-success"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Login;
