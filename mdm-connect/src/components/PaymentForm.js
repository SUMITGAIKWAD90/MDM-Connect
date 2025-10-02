import { AlertCircle, Send, User } from "lucide-react";

const PaymentForm = ({
  account,
  toAddress,
  setToAddress,
  amount,
  setAmount,
  schoolCode,
  setSchoolCode,
  studentCount,
  setStudentCount,
  paymentPurpose,
  setPaymentPurpose,
  paymentPurposes,
  sendTransaction,
  isLoading,
  error,
  connectWallet
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-orange-500">
      <div className="bg-gradient-to-r from-orange-500 to-orange-300 px-6 py-4 text-white">
        <h3 className="text-xl font-semibold flex items-center">
          <Send className="w-6 h-6 mr-3" />
          Payment Transfer Details
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., MH12345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Students <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., 250"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Purpose <span className="text-red-500">*</span>
          </label>
          <select
            value={paymentPurpose}
            onChange={(e) => setPaymentPurpose(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {Object.entries(paymentPurposes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            From (District Education Office)
          </label>
          <input
            type="text"
            value={account}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
            placeholder="Connect your official wallet"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To (School Account Number) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-mono"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (POL) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-20"
              placeholder="0.0"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">POL</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommended: ₹5 per student per day (approx. 0.001 POL)
          </p>
        </div>

        <button
          onClick={sendTransaction}
          disabled={isLoading || !account}
          className="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 hover:from-red-400 hover:via-red-500 hover:to-red-400 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-4 px-6 rounded-md transition-all duration-200 flex items-center justify-center text-lg"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
          ) : (
            <Send className="w-5 h-5 mr-3" />
          )}
          {isLoading ? 'Processing Payment...' : 'Transfer Funds to School'}
        </button>

        {!account && (
          <div className="text-center py-4 border-t">
            <button
              onClick={connectWallet}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              🔗 Connect Official Government Wallet
            </button>
            <p className="text-xs text-gray-500 mt-2">Only authorized officials can access this portal</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
