import AsyncButton from '../shared/AsyncButton';
import SectionHeading from '../shared/SectionHeading';

const ComplaintFormSection = ({
  complaint,
  setComplaint,
  files,
  setFiles,
  isSubmitting,
  submitMessage,
  onSubmit,
  onReset,
}) => {
  return (
    <section className="section section-alt">
      <div className="container">
        <article className="card" style={{ maxWidth: '760px', marginInline: 'auto' }}>
          <SectionHeading
            title="Report an Issue Anonymously"
            subtitle="Your identity will never be disclosed. All complaints are encrypted end-to-end."
          />

          <form onSubmit={onSubmit}>
            <div className="field-group">
              <label className="field-label">Complaint Details</label>
              <textarea
                rows={5}
                value={complaint}
                maxLength={1000}
                onChange={(event) => setComplaint(event.target.value)}
                placeholder="Describe the issue in detail..."
              />
              <p className="helper" style={{ textAlign: 'right' }}>
                {complaint.length}/1000
              </p>
            </div>

            <div className="field-group">
              <label className="field-label">Upload Evidence</label>
              <label className="upload-zone" htmlFor="complaint-media">
                Click to upload photos/videos as evidence
              </label>
              <input
                id="complaint-media"
                type="file"
                accept="image/*,video/*"
                multiple
                style={{ display: 'none' }}
                onChange={(event) => setFiles(Array.from(event.target.files || []))}
              />
              {!!files.length && (
                <p className="helper" style={{ marginTop: '0.4rem' }}>
                  Selected: {files.map((file) => file.name).join(', ')}
                </p>
              )}
            </div>

            <div className="actions-row">
              <AsyncButton className="btn-success" type="submit" loading={isSubmitting} loadingLabel="Submitting">
                Submit Complaint
              </AsyncButton>
              <button className="btn-ghost" type="button" onClick={onReset}>
                Reset
              </button>
            </div>

            {submitMessage ? (
              <p className={submitMessage.includes('successfully') ? 'helper' : 'error-text'} style={{ marginTop: '0.7rem' }}>
                {submitMessage}
              </p>
            ) : null}
          </form>
        </article>
      </div>
    </section>
  );
};

export default ComplaintFormSection;
