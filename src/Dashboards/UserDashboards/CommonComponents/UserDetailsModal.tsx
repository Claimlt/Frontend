import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/Authcontext';

const UserDetailsModal: React.FC = () => {
    const { userDetails, showDetailsModal, setShowDetailsModal } = useAuth();
    const navigate = useNavigate();

    const handleNavigateToProfile = () => {
        setShowDetailsModal(false);
        navigate('profile');
    };

    const handleClose = () => {
        setShowDetailsModal(false);
    };

    if (!showDetailsModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Profile</h2>
                <p className="text-gray-600 mb-4">
                    Please complete your profile information to continue using our services.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Missing Information:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {!userDetails?.province && <li>Province</li>}
                        {!userDetails?.district && <li>District</li>}
                        {!userDetails?.city && <li>City</li>}
                        {!userDetails?.address && <li>Address</li>}
                    </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                        onClick={handleNavigateToProfile}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Complete Profile Now
                    </button>
                    <button
                        onClick={handleClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;