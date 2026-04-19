import { Search } from 'lucide-react';
import AsyncButton from '../shared/AsyncButton';

const SearchCard = ({ udise, schoolName, setUdise, setSchoolName, onSearch, isSearching }) => {
  return (
    <section className="container section-hero-card">
      <div className="card">
        <div className="grid-3" style={{ alignItems: 'end' }}>
          <div className="field-group">
            <label className="field-label">UDISE Number</label>
            <input value={udise} onChange={(event) => setUdise(event.target.value)} placeholder="11-digit code" />
          </div>
          <div className="field-group">
            <label className="field-label">School Name</label>
            <input value={schoolName} onChange={(event) => setSchoolName(event.target.value)} placeholder="Enter school name" />
          </div>
          <AsyncButton
            className="btn"
            onClick={onSearch}
            loading={isSearching}
            loadingLabel="Searching"
          >
            <Search size={16} style={{ marginRight: '0.5rem', display: 'inline' }} /> Search
          </AsyncButton>
        </div>
      </div>
    </section>
  );
};

export default SearchCard;
