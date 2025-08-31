import axios from 'axios';
import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import type { Post } from '../../../../Utils/PropsInterface';


export interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  postDetails?: Post;
}

const ClaimModal = ({ isOpen, onClose, postDetails }: ClaimModalProps) => {
    const [message, setMessage] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log(postDetails);
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadImage = async (file: File): Promise<number> => {
        const formData = new FormData();
        formData.append('type', 'claims');
        formData.append('image', file);

        const response = await axios.post('http://127.0.0.1:8000/api/images', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data.id;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!postDetails?.id) {
            console.error("No post ID available");
            setError("No post ID available");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const imageIds: string[] = [];

            if (selectedFile) {
                try {
                    const imageId = await uploadImage(selectedFile);
                    imageIds.push(imageId as any);
                } catch (uploadError: any) {
                    console.error("Error uploading image:", uploadError);
                    setError("Failed to upload image. Please try again.");
                    setIsSubmitting(false);
                    return;
                }
            }

            const claimData = {
                post: postDetails.id,
                message: message,
                images: imageIds,
            };


            const claimRes = await axios.post(
                "http://127.0.0.1:8000/api/claims",
                claimData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Claim created:", claimRes.data);

            setMessage("");
            setSelectedImage(null);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onClose();

        } catch (err: any) {
            console.error("Error creating claim:", err);
            let errorMessage = "Failed to create claim";

            if (err.response) {
                console.error("Server response:", err.response.data);
                console.error("Status code:", err.response.status);

                if (err.response.data.errors) {
                    errorMessage = Object.values(err.response.data.errors).flat().join(', ');
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else {
                    errorMessage = `Server error: ${err.response.status}`;
                }
            } else if (err.request) {
                errorMessage = "No response received from server";
            } else {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-[#1a2d57] text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Claim Post: {postDetails?.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Add Image (Optional)</label>
                        {selectedImage ? (
                            <div className="relative">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1a2d57] transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-gray-500">Click to upload an image (optional)</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isSubmitting}
                                />
                            </label>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your claim message here..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2d57] focus:border-transparent transition-all"
                            rows={4}
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                </div>

                <div className="bg-gray-100 px-4 py-3 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[#1a2d57] text-white text-sm font-medium rounded-md hover:bg-[#15244a] transition-colors disabled:opacity-50"
                        disabled={isSubmitting || !message.trim()}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimModal;