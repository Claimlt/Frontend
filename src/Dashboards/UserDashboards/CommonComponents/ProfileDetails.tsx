import axios from 'axios';
import { useState, useEffect } from 'react';

interface Avatar {
    id: string;
    filename: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface User {
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    avatar: Avatar | null;
}

const ProfileDetails = () => {
    const [user, setUser] = useState<User>({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
        avatar: null
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const userData = response.data.data;
                setUser({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    contact_number: userData.contact_number,
                    avatar: userData.avatar
                });
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        setError('');

        try {
            const updateData = {
                first_name: user.first_name,
                last_name: user.last_name,
                contact_number: user.contact_number,
            };

            const response = await axios.put('http://127.0.0.1:8000/api/profile', updateData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            setMessage('Profile updated successfully!');
            if (response.data.data) {
                setUser(response.data.data);
            } else {
                setUser(response.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-[#1a2d57] px-6 py-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="mb-6 md:mb-0 md:mr-8">
                                <div className="relative">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar.url}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-4xl text-gray-400">
                                                {user.first_name ? user.first_name.charAt(0) : 'U'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                                        <svg className="w-6 h-6 text-[#1a2d57]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold">{user.first_name} {user.last_name}</h1>
                                <p className="mt-2 opacity-90">Edit your personal information below</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8 sm:px-10">
                        {message && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={user.first_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a2d57] focus:border-[#1a2d57] sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={user.last_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a2d57] focus:border-[#1a2d57] sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative rounded-lg shadow-sm">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a2d57] focus:border-[#1a2d57] sm:text-sm"
                                        required
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    id="contact_number"
                                    name="contact_number"
                                    value={user.contact_number}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#1a2d57] focus:border-[#1a2d57] sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a2d57] hover:bg-[#152547] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a2d57] disabled:opacity-75 transition-colors duration-200"
                                >
                                    {saving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                            <p>Note: Your email verification status is pending. Check your inbox for a verification link.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;