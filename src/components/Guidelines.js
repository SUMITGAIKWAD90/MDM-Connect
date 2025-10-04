

const Guidelines =  () => ( 
        /* Guidelines */
        <div className=" bg-white border border-black-200 rounded-lg p-6">
          <div className="flex items-start">
            <div>
              <h4 className="text-xl font-semibold text-black-800 mb-4">Mid Day Meal Scheme Guidelines</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-black-700">
                <div>
                  <h5 className="font-semibold mb-2">Payment Guidelines:</h5>
                  <ul className="space-y-1">
                    <li>• Funds to be released weekly to schools</li>
                    <li>• Amount: ₹5 per student per day (Primary)</li>
                    <li>• ₹7.5 per student per day (Upper Primary)</li>
                    <li>• All transactions are recorded on blockchain</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Security & Compliance:</h5>
                  <ul className="space-y-1">
                    <li>• Only authorized officials can transfer funds</li>
                    <li>• School codes must be verified</li>
                    <li>• Maintain transaction records for audit</li>
                    <li>• Report any discrepancies immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

);

export default Guidelines;