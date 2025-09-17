import { useState, useEffect } from 'react';
import { FaBell, FaImage } from 'react-icons/fa';
import axios from 'axios';
import type { Claim } from '../../../../../Utils/PropsInterface';

const ClaimRequestChecking = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/my-claims', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setClaims(response.data.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };


const pendingClaims = claims.filter(claim => !claim.approved_at);
  const hasPendingClaims = pendingClaims.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
   className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-all duration-200 ease-in-out"
      >
        <FaBell className="text-xl text-gray-100" />
        {hasPendingClaims && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {pendingClaims.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Claim Requests</h3>
            <p className="text-sm text-gray-500">
              {hasPendingClaims ? `${pendingClaims.length} pending requests` : 'No pending requests'}
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : hasPendingClaims ? (
              pendingClaims.map(claim => (
                <div key={claim.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {claim.user.first_name} {claim.user.last_name}
                      </h4>
                      <p className="text-sm text-gray-500">{claim.user.contact_number}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Pending
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{claim.message}</p>

                  {claim.images && claim.images.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <FaImage className="mr-1" /> Proof Photo
                      </div>
                      <img
                        src={claim.images[0].url}
                        alt="Proof"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No pending claim requests
              </div>
            )}
          </div>

          {hasPendingClaims && (
            <div className="p-3 bg-gray-50 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClaimRequestChecking;