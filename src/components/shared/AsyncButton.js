import LoadingSpinner from './LoadingSpinner';

const AsyncButton = ({
  type = 'button',
  className = 'btn',
  loading,
  loadingLabel,
  children,
  disabled,
  onClick,
  style,
}) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled || loading} style={style}>
      {loading ? (
        <>
          <LoadingSpinner />
          <span style={{ marginLeft: '0.45rem' }}>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AsyncButton;
