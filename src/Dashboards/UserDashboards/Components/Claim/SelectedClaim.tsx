import { FaImage } from "react-icons/fa"


function SelectedClaim({ selectedClaim, formatDate, getStatus }: { selectedClaim: any, formatDate: (dateString: string) => string, getStatus: (claim: any) => string }) {
  return (
    <div>
        <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h4 className="text-xl font-semibold text-gray-900">Claim for Item</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{formatDate(selectedClaim.created_at)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatus(selectedClaim) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          getStatus(selectedClaim) === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {getStatus(selectedClaim).charAt(0).toUpperCase() + getStatus(selectedClaim).slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h5 className="font-medium text-gray-900 mb-3 text-lg">Claimant Information</h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">
                            {selectedClaim.user.first_name} {selectedClaim.user.last_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium text-gray-900">{selectedClaim.user.contact_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{selectedClaim.user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h5 className="font-medium text-gray-900 mb-3 text-lg">Message</h5>
                      <p className="text-gray-700 whitespace-pre-line">{selectedClaim.message}</p>
                    </div>
                  </div>

                  {selectedClaim.images && selectedClaim.images.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 text-lg flex items-center gap-2">
                        <FaImage className="text-[#2c4a8a]" />
                        Claimant's Proof Photo
                      </h5>
                      <div className="border rounded-xl overflow-hidden">
                        <img
                          src={selectedClaim.images[0].url}
                          alt="Proof of claim"
                          className="w-full h-72 object-contain bg-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
    </div>
  )
}

export default SelectedClaim