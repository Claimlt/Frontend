import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTimes,  FaEnvelope, FaArrowLeft} from 'react-icons/fa';
import type { ApiResponse, Claim } from '../../../../../Utils/PropsInterface';
import ResolveClaims from './ResolveClaims';
import SelectedClaim from './SelectedClaim';
import PendingClaims from './PendingClaims';

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

  const fetchClaims = async () => {
    try {
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
  useEffect(() => {
    fetchClaims();
    const interval = setInterval(fetchClaims, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
                <SelectedClaim
                  selectedClaim={selectedClaim}
                  formatDate={formatDate}
                  getStatus={getStatus}
                />
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
                            <PendingClaims
                              key={claim.id}
                              claim={claim}
                              openClaim={openClaim}
                              formatDate={formatDate}
                              getStatus={getStatus}
                            />
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
