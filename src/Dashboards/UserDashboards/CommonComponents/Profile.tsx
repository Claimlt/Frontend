import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useAuth } from '../../../Context/Authcontext';

const Profile: React.FC = () => {
    const { userDetails,token } = useAuth();
    const [formData, setFormData] = useState({
        province: '',
        district: '',
        city: '',
        address: '',
        profile_image: null as File | null
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (userDetails) {
            setFormData({
                province: userDetails.province || '',
                district: userDetails.district || '',
                city: userDetails.city || '',
                address: userDetails.address || '',
                profile_image: null
            });
            
            if (userDetails.profile_image) {
                setPreviewImage(userDetails.profile_image);
            }
        }
    }, [userDetails]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, profile_image: file }));
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const data = new FormData();
            
            Object.keys(formData).forEach(key => {
                const value = formData[key as keyof typeof formData];
                if (value !== null) {
                    data.append(key, value);
                }
            });
            
            const response = await axios.post('http://127.0.0.1:8000/api/user/details/update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });    
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
                        <p className="mt-2 text-sm text-gray-600">Please provide the following information</p>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                                    Province
                                </label>
                                <input
                                    id="province"
                                    name="province"
                                    type="text"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your province"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                    District
                                </label>
                                <input
                                    id="district"
                                    name="district"
                                    type="text"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your district"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your city"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your address"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Image
                                </label>
                                <input
                                    id="profile_image"
                                    name="profile_image"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded-full" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b64b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;