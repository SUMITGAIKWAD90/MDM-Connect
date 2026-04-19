const SchoolIdentificationSection = ({ formData, errors, onChange }) => {
  return (
    <section>
      <h3 className="card-title">1. School ID</h3>
      <div className="grid-2" style={{ marginTop: '0.8rem' }}>
        <div className="field-group">
          <label className="field-label">UDISE Code</label>
          <input name="udiseCode" value={formData.udiseCode} maxLength={11} onChange={onChange} placeholder="11-digit UDISE code" />
          {errors.udiseCode ? <p className="error-text">{errors.udiseCode}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">School Name</label>
          <input name="schoolName" value={formData.schoolName} onChange={onChange} placeholder="Enter school name" />
          {errors.schoolName ? <p className="error-text">{errors.schoolName}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default SchoolIdentificationSection;
