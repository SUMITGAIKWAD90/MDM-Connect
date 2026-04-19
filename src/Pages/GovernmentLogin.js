import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GOVERNMENT_EMAIL, GOVERNMENT_PASSWORD, GOVERNMENT_USERNAME } from '../config/authConfig';
import PageLayout from '../components/PageLayout';
import { auth, db } from '../firebase';
import SectionHeading from '../components/shared/SectionHeading';

const GovernmentLogin = () => {
  const navigate = useNavigate();
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (auth.currentUser?.email === GOVERNMENT_EMAIL) {
    return <Navigate to="/gov-home" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!officialId.trim() || !password.trim()) {
      setError('Enter username and password.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (officialId.trim() !== GOVERNMENT_USERNAME) {
      setError('Invalid username.');
      setIsSubmitting(false);
      return;
    }

    if (password !== GOVERNMENT_PASSWORD) {
      setError('Invalid password.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (auth.currentUser && auth.currentUser.email !== GOVERNMENT_EMAIL) {
        await signOut(auth);
      }

      try {
        await signInWithEmailAndPassword(auth, GOVERNMENT_EMAIL, GOVERNMENT_PASSWORD);
      } catch (signInError) {
        if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
          const created = await createUserWithEmailAndPassword(auth, GOVERNMENT_EMAIL, GOVERNMENT_PASSWORD);
          await setDoc(
            doc(db, 'officials', created.user.uid),
            {
              username: GOVERNMENT_USERNAME,
              email: GOVERNMENT_EMAIL,
              role: 'government',
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } else {
          throw signInError;
        }
      }

      navigate('/gov-home', { replace: true });
    } catch (loginError) {
      if (loginError.code === 'auth/operation-not-allowed') {
        setError('Email/password sign-in is disabled in Firebase Authentication.');
      } else {
        setError(loginError?.message || 'Government login failed. Verify Firebase setup and retry.');
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
              title="Government Login"
              subtitle="Use your official PM POSHAN credentials to access request approval and complaint response workflows."
            />
            <p className="helper" style={{ marginTop: '0.5rem' }}>
              Username: <span className="mono">{GOVERNMENT_USERNAME}</span> | Password: <span className="mono">{GOVERNMENT_PASSWORD}</span>
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
              <div className="field-group">
                <label className="field-label">Username</label>
                <input
                  value={officialId}
                  onChange={(event) => setOfficialId(event.target.value)}
                  placeholder="Enter username"
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
                <button className="btn" type="submit" disabled={isSubmitting}>
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

export default GovernmentLogin;
