import { BarChart3, CircleDollarSign, GraduationCap, Users } from 'lucide-react';

const defaultMetrics = [
  { title: 'Students Registered', value: '1,248', icon: Users },
  { title: 'Meals Served This Month', value: '23,870', icon: GraduationCap },
  { title: 'Latest Transfer', value: 'Rs.1,25,000', icon: CircleDollarSign },
  { title: 'Compliance Score', value: '92%', icon: BarChart3 },
];

const iconMap = {
  'Requests Submitted': Users,
  'Pending Approvals': GraduationCap,
  'Approved Requests': CircleDollarSign,
  'Rejected Requests': BarChart3,
  'Latest Approved Amount': CircleDollarSign,
};

const MetricsSection = ({ metrics = defaultMetrics }) => {
  return (
    <div className="grid-4">
      {metrics.map((metric, index) => {
        const MetricIcon = metric.icon || iconMap[metric.title] || Users;
        return (
          <article className="card metric-card" key={metric.title}>
            <div className={`icon-bubble icon-bubble--${index % 2 === 0 ? 'accent' : 'secondary'}`}>
              <MetricIcon size={20} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.15rem' }}>
              {metric.title}
            </h3>
            <p style={{ fontFamily: 'Yatra One, cursive', fontSize: '1.7rem', color: 'var(--color-accent)', marginTop: '0.4rem' }}>
              {metric.value}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default MetricsSection;
