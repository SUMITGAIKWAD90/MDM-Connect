import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { GOVERNMENT_EMAIL } from '../config/authConfig';
import { auth } from '../firebase';
import SectionHeading from '../components/shared/SectionHeading';

const SchoolLogin = () => {
  const navigate = useNavigate();
  const [schoolEmail, setSchoolEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (auth.currentUser && auth.currentUser.email !== GOVERNMENT_EMAIL) {
    return <Navigate to="/school-dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!schoolEmail.trim() || !password.trim()) {
      setError('Enter school email and password.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      await signInWithEmailAndPassword(auth, schoolEmail.trim(), password);
      navigate('/school-dashboard', { replace: true });
    } catch (loginError) {
      if (loginError.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please use your registered school email and password.');
      } else if (loginError.code === 'auth/operation-not-allowed') {
        setError('Email/password sign-in is disabled in Firebase Authentication.');
      } else if (loginError.code === 'auth/too-many-requests') {
        setError('Too many attempts. Wait a few minutes before retrying.');
      } else {
        setError(loginError?.message || 'Login failed. Please retry.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="section">
        <div className="container" style={{ maxWidth: '560px' }}>
          <article className="card">
            <SectionHeading
              title="School Login"
              subtitle="Sign in to submit fund requests and track approval from government officers."
            />

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
              <div className="field-group">
                <label className="field-label">School Email</label>
                <input
                  value={schoolEmail}
                  onChange={(event) => setSchoolEmail(event.target.value)}
                  placeholder="Enter registered school email"
                />
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </div>

              {error ? <p className="error-text">{error}</p> : null}

              <div className="actions-row" style={{ marginTop: '0.9rem' }}>
                <button className="btn-success" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </PageLayout>
  );
};

export default SchoolLogin;
