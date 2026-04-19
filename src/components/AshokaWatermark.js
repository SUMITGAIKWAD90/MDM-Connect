const spokes = Array.from({ length: 24 }, (_, index) => index * 15);

const AshokaWatermark = () => {
  return (
    <svg className="ashoka-watermark" viewBox="0 0 240 240" aria-hidden="true">
      <circle cx="120" cy="120" r="76" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="120" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="120"
          y1="120"
          x2="120"
          y2="44"
          stroke="currentColor"
          strokeWidth="2"
          transform={`rotate(${angle} 120 120)`}
        />
      ))}
    </svg>
  );
};

export default AshokaWatermark;
