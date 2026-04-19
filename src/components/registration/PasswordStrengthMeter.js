const PasswordStrengthMeter = ({ score }) => {
  return (
    <div className="password-meter">
      <span className={score >= 1 ? 'on red' : ''} />
      <span className={score >= 2 ? 'on amber' : ''} />
      <span className={score >= 3 ? 'on green' : ''} />
      <span className={score >= 4 ? 'on emerald' : ''} />
    </div>
  );
};

export default PasswordStrengthMeter;
