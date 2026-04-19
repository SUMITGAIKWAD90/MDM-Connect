import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import GovernmentHome from './Pages/GovernmentHome';
import GovernmentLogin from './Pages/GovernmentLogin';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Paymentpage from './Pages/Paymentpage';
import PublicPage from './Pages/Public';
import Register from './Pages/Register';
import SchoolLogin from './Pages/SchoolLogin';
import Schooldashboard from './Pages/Schooldashboard';

function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanupMarker = 'mdm.cleanup.auth.v1';
    if (window.localStorage.getItem(cleanupMarker) === 'done') return;

    // Remove deprecated local auth/session stores now that auth is Firebase-only.
    window.localStorage.removeItem('mdm.school.accounts.v1');
    window.localStorage.removeItem('mdm.school.session.v1');
    window.localStorage.removeItem('mdm.government.auth.v1');

    window.localStorage.setItem(cleanupMarker, 'done');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gov-login" element={<GovernmentLogin />} />
        <Route path="/gov-home" element={<GovernmentHome />} />
        <Route path="/gov-dashboard" element={<Navigate to="/gov-home" replace />} />
        <Route path="/school-dashboard" element={<Schooldashboard />} />
        <Route path="/school-login" element={<SchoolLogin />} />
        <Route path="/login/school" element={<Navigate to="/school-login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
