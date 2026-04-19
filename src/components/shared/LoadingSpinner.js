const LoadingSpinner = ({ size = 16 }) => {
  return <span className="spin" style={{ width: size, height: size }} aria-hidden="true" />;
};

export default LoadingSpinner;
