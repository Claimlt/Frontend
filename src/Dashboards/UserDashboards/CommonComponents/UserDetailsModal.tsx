import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { useAuth } from '../../../Context/Authcontext';
import axios from 'axios';

interface UserDetailsModalProps {
    onClose: () => void;
    onUpdate: () => void;
}

interface ImageUploadResponse {
    data: any;
    id: string;
    filename: string;
    url: string;
    created_at: string;
    updated_at: string;
}

const UserDetailsModal = ({ onClose, onUpdate }: UserDetailsModalProps) => {
    const { setShowDetailsModal, updateUserProfile } = useAuth();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        setShowDetailsModal(false);
        onClose();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size must be less than 5MB');
                return;
            }
            setUploadError(null);
            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size must be less than 5MB');
                return;
            }
            setUploadError(null);
            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setPreviewUrl(null);
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!profileImage) return null;

        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('type', 'avatars');
            formData.append('image', profileImage);

            const response = await axios.post<ImageUploadResponse>('http://127.0.0.1:8000/api/images', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data.data.id;
        } catch (error) {
            let errorMessage = 'Failed to upload image. Please try again.';

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 413) {
                    errorMessage = 'File is too large. Please select a smaller image.';
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
            }

            setUploadError(errorMessage);
            console.error('Image upload error:', error);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const updateProfile = async (avatarId: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/profile-avatar', {
                avatar: avatarId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to update profile. Please try again.';

            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    errorMessage = Object.values(errors).flat().join(' ');
                }
            }
            setShowDetailsModal(false);
            setUploadError(errorMessage);
            console.error('Profile update error:', error);
            throw error;
        }
    };

    const handleSaveProfilePicture = async () => {
        if (!profileImage) {
            handleClose();
            return;
        }
        const avatarId = await uploadImage();
        if (!avatarId) return;
        try {
            const updatedProfile = await updateProfile(avatarId);
            updateUserProfile(updatedProfile);
            onUpdate();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="bg-[#1a2d57] p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 opacity-90">
                        Please add a profile picture to continue using our services.
                    </p>
                </div>

                <div className="p-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={previewUrl}
                                        alt="Profile preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600 transition-colors"
                                        disabled={isUploading}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className={`w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? 'bg-blue-100 border-2 border-dashed border-blue-400' : 'bg-gray-100 border-2 border-dashed border-gray-300'} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={isUploading ? undefined : triggerFileInput}
                                    onDragOver={isUploading ? undefined : handleDragOver}
                                    onDragLeave={isUploading ? undefined : handleDragLeave}
                                    onDrop={isUploading ? undefined : handleDrop}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-xs text-gray-500 text-center px-2">Click to upload or drag and drop</span>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    {uploadError && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{uploadError}</span>
                        </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-[#1a2d57] mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Photo guidelines
                        </h3>
                        <ul className="text-sm text-[#1a2d57] list-disc list-inside space-y-1">
                            <li>Use a clear, front-facing photo of your face</li>
                            <li>Make sure the image is well-lit</li>
                            <li>File format: JPG, PNG or GIF</li>
                            <li>Max file size: 5MB</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUploading}
                        >
                            Remind Me Later
                        </button>
                        <button
                            onClick={handleSaveProfilePicture}
                            className="px-4 py-2 bg-[#1a2d57] text-white rounded-md hover:bg-[#15254a] transition-colors font-medium shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : profileImage ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Save Profile Picture
                                </>
                            ) : (
                                'Skip for Now'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;