import { CreditCard, Wallet } from 'lucide-react';
import AsyncButton from '../shared/AsyncButton';
import { purposeOptions } from './constants';

const TransferFundsCard = ({
  formData,
  setFormData,
  walletAddress,
  isConnecting,
  isTransferring,
  prefillNote,
  error,
  estimatedPol,
  inrPerPol,
  isRateLoading,
  onConnect,
  onTransfer,
}) => {
  return (
    <article className="card">
      <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
        <CreditCard size={18} style={{ display: 'inline', marginRight: '0.4rem', color: 'var(--color-primary)' }} />
        Transfer Funds
      </h3>
      <form onSubmit={onTransfer} style={{ marginTop: '1rem' }}>
        <div className="field-group">
          <label className="field-label">School Code</label>
          <input
            value={formData.schoolCode}
            onChange={(event) => setFormData((prev) => ({ ...prev, schoolCode: event.target.value }))}
            placeholder="e.g. 27160100101"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Number of Students</label>
          <input
            type="number"
            value={formData.studentCount}
            onChange={(event) => setFormData((prev) => ({ ...prev, studentCount: event.target.value }))}
            placeholder="e.g. 450"
          />
        </div>

        <div className="field-group">
          <label className="field-label">Payment Purpose</label>
          <select value={formData.purpose} onChange={(event) => setFormData((prev) => ({ ...prev, purpose: event.target.value }))}>
            {purposeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label className="field-label">From Wallet</label>
          <input className="mono" value={walletAddress || 'Not connected'} readOnly />
        </div>

        <div className="field-group">
          <label className="field-label">To Wallet Address</label>
          <input
            className="mono"
            value={formData.toAddress}
            onChange={(event) => setFormData((prev) => ({ ...prev, toAddress: event.target.value }))}
            placeholder="0x..."
          />
        </div>

        <div className="field-group">
          <label className="field-label">Amount in INR (Rs.)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(event) => setFormData((prev) => ({ ...prev, amount: event.target.value }))}
            placeholder="e.g. 1000.00"
          />
          <p className="helper" style={{ marginTop: '0.45rem' }}>
            {isRateLoading
                ? 'Fetching live POL conversion rate...'
                : estimatedPol
                ? `Estimated transfer: ${estimatedPol} POL (1 POL ~= Rs.${Number(inrPerPol).toFixed(2)})`
                : `1 POL ~= Rs.${Number(inrPerPol).toFixed(2)}`}
          </p>
        </div>

        {prefillNote ? <p className="helper" style={{ marginBottom: '0.7rem' }}>{prefillNote}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        <div className="actions-row" style={{ marginTop: '0.85rem' }}>
          {!walletAddress ? (
            <AsyncButton className="btn" onClick={onConnect} loading={isConnecting} loadingLabel="Connecting">
              <Wallet size={16} style={{ marginRight: '0.45rem', display: 'inline' }} /> Connect MetaMask Wallet
            </AsyncButton>
          ) : (
            <AsyncButton className="btn" type="submit" loading={isTransferring} loadingLabel="Initiating Transfer">
              Initiate Transfer
            </AsyncButton>
          )}
        </div>

        <p className="helper" style={{ marginTop: '0.85rem' }}>
          Powered by Web3 - Polygon Network
        </p>
      </form>
    </article>
  );
};

export default TransferFundsCard;
