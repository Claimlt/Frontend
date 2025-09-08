import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaEllipsisV, FaEnvelope, FaArrowLeft, FaImage } from 'react-icons/fa';
import type { ApiResponse, Claim } from '../../../../../Utils/PropsInterface';
import ResolveClaims from './ResolveClaims';

const MessageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  });

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ApiResponse>('/claims');
        setClaims(response.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || `Error: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching claims:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isModalOpen) {
      fetchClaims();
    }
  }, [isModalOpen]);

  const openClaim = (claim: Claim) => {
    setSelectedClaim(claim);
  };

  const closeClaim = () => {
    setSelectedClaim(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';

    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getStatus = (claim: Claim) => {
    return claim.approved_at ? 'accepted' : 'pending';
  };

  const pendingClaims = claims.filter(claim => !claim.approved_at);
  const resolvedClaims = claims.filter(claim => claim.approved_at);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-all duration-200 ease-in-out"
        title="Messages"
      >
        <FaEnvelope className="text-xl" />
        {pendingClaims.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {pendingClaims.length}
          </span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#2c4a8a] to-[#3a63b8] text-white">
              <div className="flex items-center">
                {selectedClaim && (
                  <button
                    onClick={closeClaim}
                    className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <h3 className="text-xl font-semibold">
                  {selectedClaim ? 'Claim Details' : 'Received Claims'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c4a8a]"></div>
                </div>
              ) : selectedClaim ? (
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
              ) : (
                <div className="space-y-4">
                  {claims.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <FaEnvelope className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No claims received yet</p>
                      <p className="text-sm mt-1">When someone claims your found items, they'll appear here.</p>
                    </div>
                  ) : (
                    <>
                      {pendingClaims.length > 0 && (
                        <>
                          <div className="mb-4">
                            <h4 className="text-lg font-medium text-gray-900">Pending Claims</h4>
                            <p className="text-sm text-gray-500">Review these claims</p>
                          </div>

                          {pendingClaims.map(claim => (
                            <div
                              key={claim.id}
                              onClick={() => openClaim(claim)}
                              className="p-5 border rounded-xl cursor-pointer hover:border-[#2c4a8a] transition-all duration-200 ease-in-out bg-white shadow-sm hover:shadow-md"
                            >
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 truncate">
                                    Claim from {claim.user.first_name} {claim.user.last_name}
                                  </h4>
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{claim.message}</p>
                                  <div className="flex items-center mt-3 flex-wrap gap-2">
                                    <span className="text-xs text-gray-400">{formatDate(claim.created_at)}</span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      {claim.user.contact_number}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatus(claim) === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {getStatus(claim).charAt(0).toUpperCase() + getStatus(claim).slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      <ResolveClaims
                      openClaim={openClaim}
                      formatDate={formatDate}
                        resolvedClaims={resolvedClaims}
                      />

                    </>
                  )}
                </div>
              )}
            </div>

            <div className="border-t p-5 bg-gray-50">
              {selectedClaim ? (
                <button
                  onClick={closeClaim}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to All Claims
                </button>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {pendingClaims.length} pending claims
                  </span>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-[#2c4a8a] text-white rounded-lg hover:bg-[#1e3269] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageModal;