import SiteFooter from './SiteFooter';

const PageLayout_public = ({ children }) => {
  return (
    <div className="page-shell">
      <main className="page-content">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default PageLayout_public;
