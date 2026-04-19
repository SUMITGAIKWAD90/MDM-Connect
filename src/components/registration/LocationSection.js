import { indianStates } from './constants';

const LocationSection = ({ formData, errors, onChange }) => {
  return (
    <section style={{ marginTop: '1.2rem' }}>
      <h3 className="card-title">2. Location</h3>
      <div className="grid-2" style={{ marginTop: '0.8rem' }}>
        <div className="field-group">
          <label className="field-label">State</label>
          <select name="state" value={formData.state} onChange={onChange}>
            <option value="">Select state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state ? <p className="error-text">{errors.state}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">District</label>
          <input name="district" value={formData.district} onChange={onChange} placeholder="Enter district" />
          {errors.district ? <p className="error-text">{errors.district}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">City</label>
          <input name="city" value={formData.city} onChange={onChange} placeholder="Enter city" />
          {errors.city ? <p className="error-text">{errors.city}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">Town / Village</label>
          <input name="townVillage" value={formData.townVillage} onChange={onChange} placeholder="Enter town/village" />
          {errors.townVillage ? <p className="error-text">{errors.townVillage}</p> : null}
        </div>
        <div className="field-group">
          <label className="field-label">Pincode</label>
          <input name="pincode" value={formData.pincode} maxLength={6} onChange={onChange} placeholder="6-digit pincode" />
          {errors.pincode ? <p className="error-text">{errors.pincode}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
