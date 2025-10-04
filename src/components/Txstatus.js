import { CheckCircle, CreditCard, ExternalLink } from "lucide-react";

const Txstatus = ({ txDetails, paymentPurposes }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-green-500">
      <div className="bg-gradient-to-r from-green-500 to-green-300 px-6 py-4 text-white">
        <h3 className="text-xl font-semibold">Payment Status & Receipt</h3>
      </div>

      <div className="p-6">
        {txDetails ? (
          <div className="space-y-4">
            {/* ✅ Success Alert */}
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <p className="text-green-800 font-semibold">Payment Successful!</p>
                  <p className="text-green-600 text-sm">
                    Funds transferred to school account
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                Payment Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-gray-500 font-medium">
                    School Code
                  </label>
                  <p className="text-gray-800 font-mono">{txDetails.schoolCode}</p>
                </div>
                <div>
                  <label className="block text-gray-500 font-medium">
                    Students
                  </label>
                  <p className="text-gray-800">{txDetails.studentCount}</p>
                </div>
                <div>
                  <label className="block text-gray-500 font-medium">Purpose</label>
                  <p className="text-gray-800">
                    {paymentPurposes[txDetails.paymentPurpose]}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-500 font-medium">Amount</label>
                  <p className="text-gray-800 font-semibold">
                    {txDetails.amount} POL
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Transaction Info */}
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-500 font-medium">
                  Transaction Hash
                </label>
                <p className="text-gray-800 font-mono break-all bg-gray-50 p-2 rounded">
                  {txDetails.transactionHash}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-medium">
                    Block Number
                  </label>
                  <p className="text-gray-800">{txDetails.blockNumber}</p>
                </div>
                <div>
                  <label className="block text-gray-500 font-medium">Status</label>
                  <p className="text-green-600 font-semibold">✓ Confirmed</p>
                </div>
              </div>
              <div className="pt-3 border-t">
                <a
                  href={txDetails.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain Explorer
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-lg font-medium">Awaiting Payment</p>
            <p className="text-sm">
              Complete the transfer to generate payment receipt
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Txstatus;
