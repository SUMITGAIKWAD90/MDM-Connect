import { Building2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const ContactSection = () => {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '920px' }}>
        <SectionHeading title="Contact Us" />
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          <article className="card">
            <h4 className="card-title">Head Office</h4>
            <p style={{ marginTop: '0.6rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <MapPin size={15} /> Department of School Education &amp; Literacy, Shastri Bhawan, New Delhi - 110001
            </p>
            <p style={{ marginTop: '0.45rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <Phone size={15} /> 1800-180-5678 (Toll Free)
            </p>
            <p style={{ marginTop: '0.45rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <Mail size={15} /> mdm-moe@gov.in
            </p>
            <p style={{ marginTop: '0.45rem', display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              <Clock3 size={15} /> Mon-Fri, 9:30 AM - 5:30 PM IST
            </p>
          </article>

          <article className="card">
            <h4 className="card-title">Grievance Redressal</h4>
            <p style={{ marginTop: '0.6rem' }}>For grievances related to PM POSHAN, citizens may contact:</p>
            <p className="read-more" style={{ marginTop: '0.55rem' }}>
              CPGRAMS Portal
            </p>
            <p className="helper">pgportal.gov.in</p>
            <p className="read-more" style={{ marginTop: '0.55rem' }}>
              RTI Requests
            </p>
            <p className="helper">rtionline.gov.in</p>
            <p style={{ marginTop: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={15} /> Ministry nodal officers monitor and close complaints with SLA tracking.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
