import { Building2, Mail, Phone, ShieldCheck, Soup, Users } from 'lucide-react';

const stats = [
  { label: 'Children Covered', value: '12.5 Cr+', icon: Users },
  { label: 'Schools Enrolled', value: '11.2 L+', icon: Building2 },
  { label: 'Meal Helpers', value: '26 L+', icon: Soup },
  { label: 'Daily Meals Served', value: '9.8 Cr+', icon: ShieldCheck },
];

const quickLinks = ['RTI', 'Terms of Service', 'Accessibility', 'Privacy Policy', 'Sitemap', 'Archives'];

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-stats">
        <div className="container grid-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="footer-stat">
                <Icon size={18} style={{ marginInline: 'auto' }} />
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer-main">
        <div className="container grid-3">
          <div>
            <h3 className="footer-title">Ministry of Education</h3>
            <p>Government of India</p>
            <p>Department of School Education &amp; Literacy</p>
            <p>Shastri Bhawan, New Delhi - 110001</p>
          </div>

          <div>
            <h3 className="footer-title">Contact</h3>
            <p style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <Phone size={14} /> Helpline: 1800-180-5678
            </p>
            <p style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <Mail size={14} /> mdm-moe@gov.in
            </p>
            <p>Mon-Fri, 9:30 AM - 5:30 PM IST</p>
          </div>

          <div>
            <h3 className="footer-title">Quick Links</h3>
            <div className="grid-2">
              {quickLinks.map((link) => (
                <a href="/" key={link}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider" />
      <div className="footer-bottom">
        <div className="container footer-bottom__line">
          <span>© 2026 PM POSHAN, Ministry of Education, Government of India. All Rights Reserved.</span>
          <span>Designed &amp; Developed by National Informatics Centre (NIC)</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
