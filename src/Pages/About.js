import AboutHero from '../components/about/AboutHero';
import ContactSection from '../components/about/ContactSection';
import MinistrySection from '../components/about/MinistrySection';
import SchemeHistorySection from '../components/about/SchemeHistorySection';
import PageLayout from '../components/PageLayout';

const About = () => {
  return (
    <PageLayout>
      <AboutHero />
      <MinistrySection />
      <SchemeHistorySection />
      <ContactSection />
    </PageLayout>
  );
};

export default About;
