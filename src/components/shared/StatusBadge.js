const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase();
  const classMap = {
    confirmed: 'badge badge-confirmed',
    pending: 'badge badge-pending',
    failed: 'badge badge-failed',
    approved: 'badge badge-confirmed',
    rejected: 'badge badge-failed',
    responded: 'badge badge-confirmed',
    open: 'badge badge-pending',
  };

  return <span className={classMap[normalized] || 'badge'}>{status}</span>;
};

export default StatusBadge;
