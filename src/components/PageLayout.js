import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

const PageLayout = ({ children }) => {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default PageLayout;
