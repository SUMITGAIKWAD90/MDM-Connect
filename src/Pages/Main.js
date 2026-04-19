import AboutCardsSection from '../components/home/AboutCardsSection';
import HomeHero from '../components/home/HomeHero';
import NewsSection from '../components/home/NewsSection';
import PaymentGuidelinesSection from '../components/home/PaymentGuidelinesSection';
import ResolutionsSection from '../components/home/ResolutionsSection';
import PageLayout from '../components/PageLayout';

const Main = () => {
  return (
    <PageLayout>
      <HomeHero />
      <AboutCardsSection />
      <NewsSection />
      <ResolutionsSection />
      <PaymentGuidelinesSection />
    </PageLayout>
  );
};

export default Main;
