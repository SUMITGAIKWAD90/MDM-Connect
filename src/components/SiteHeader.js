import { ChevronDown, Menu, School, ShieldCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Public Portal', to: '/public' },
  { label: 'About Us', to: '/about' },
];

const SiteHeader = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
    setIsLoginOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__row">
          <Link to="/" className="brand" aria-label="PM POSHAN Home">
            <img src="/images/logo.png" alt="Government emblem" />
            <div>
              <h1 className="brand__title">PM POSHAN</h1>
              <p className="brand__subtitle">प्रधानमंत्री पोषण शक्ति निर्माण</p>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="login-dropdown" ref={loginRef}>
              <button
                className="btn login-trigger"
                type="button"
                onClick={() => setIsLoginOpen((current) => !current)}
                aria-expanded={isLoginOpen}
              >
                Login
                <ChevronDown size={16} />
              </button>

              {isLoginOpen && (
                <div className="login-menu" role="menu">
                  <Link to="/gov-login" className="login-item" role="menuitem">
                    <ShieldCheck size={18} className="icon-navy" />
                    Government Official
                  </Link>
                  <Link to="/school-login" className="login-item" role="menuitem">
                    <School size={18} className="icon-green" />
                    School Login
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileOpen((current) => !current)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/gov-login" className="btn">
              Government Official
            </Link>
            <Link to="/school-login" className="btn-success btn">
              School Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
