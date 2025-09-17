import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaEnvelope, FaArrowLeft, FaEye } from 'react-icons/fa';
import type { ApiResponse, Claim, Post } from '../../../../../Utils/PropsInterface';
import ResolveClaims from './ResolveClaims';
import SelectedClaim from './SelectedClaim';
import PendingClaims from './PendingClaims';

const MessageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [claimsLoading, setClaimsLoading] = useState(false);
  const [pendingClaimsCount, setPendingClaimsCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAllPendingClaims = async () => {
    try {
      const postsResponse = await axios.get<{ data: Post[] }>('http://127.0.0.1:8000/api/my-posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      let totalPendingClaims = 0;
      for (const post of postsResponse.data.data) {
        try {
          const claimsResponse = await axios.get<ApiResponse>(
            `http://127.0.0.1:8000/api/posts/${post.id}/claims`, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          
          const pendingClaims = claimsResponse.data.data.filter(claim => !claim.approved_at);
          totalPendingClaims += pendingClaims.length;
        } catch (err) {
          console.error(`Error fetching claims for post ${post.id}:`, err);
        }
      }
      
      setPendingClaimsCount(totalPendingClaims);
      return postsResponse.data.data;
    } catch (err) {
      console.error('Error fetching pending claims count:', err);
      return [];
    }
  };

  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const posts = await fetchAllPendingClaims();
      setPosts(posts);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Error: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClaims = async (postId: string) => {
    try {
      setClaimsLoading(true);
      setError(null);
      const response = await axios.get<ApiResponse>(`http://127.0.0.1:8000/api/posts/${postId}/claims`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setClaims(response.data.data);
      setSelectedPostId(postId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Error: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error fetching claims:', err);
    } finally {
      setClaimsLoading(false);
    }
  };

  const goBackToPosts = () => {
    setSelectedPostId(null);
    setClaims([]);
    setSelectedClaim(null);
  };

  useEffect(() => {
    fetchAllPendingClaims();
  intervalRef.current = setInterval(fetchAllPendingClaims, 30000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchPosts();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(fetchAllPendingClaims, 10000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(fetchAllPendingClaims, 30000);
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
        {pendingClaimsCount > 0 && ( 
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {pendingClaimsCount > 99 ? '99+' : pendingClaimsCount}
          </span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#2c4a8a] to-[#3a63b8] text-white">
              <div className="flex items-center">
                {selectedClaim ? (
                  <button
                    onClick={closeClaim}
                    className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </button>
                ) : selectedPostId ? (
                  <button
                    onClick={goBackToPosts}
                    className="mr-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <FaArrowLeft className="h-5 w-5" />
                  </button>
                ) : null}
                <h3 className="text-xl font-semibold">
                  {selectedClaim 
                    ? 'Claim Details' 
                    : selectedPostId 
                      ? 'Post Claims' 
                      : 'My Posts'}
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
              ) : selectedPostId ? (
                <div className="space-y-4">
                  {claimsLoading ? (
                    <div className="flex justify-center items-center py-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c4a8a]"></div>
                    </div>
                  ) : claims.length === 0 ? (
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
              ) : (
                <div className="space-y-4">
                  {posts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <FaEnvelope className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No posts found</p>
                      <p className="text-sm mt-1">You haven't posted any found items yet.</p>
                    </div>
                  ) : (
                    posts.map(post => (
                      <div key={post.id} className="p-5 border rounded-xl bg-white shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.description}</p>
                            <div className="flex items-center mt-3 flex-wrap gap-2">
                              <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => fetchClaims(post.id)}
                              className="p-2 bg-[#2c4a8a] text-white rounded-lg hover:bg-[#1e3269] transition-colors duration-200 flex items-center gap-2"
                            >
                              <FaEye className="text-sm" />
                              View Claims
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
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
                  Back to Claims
                </button>
              ) : selectedPostId ? (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {pendingClaims.length} pending claims
                  </span>
                  <button
                    onClick={goBackToPosts}
                    className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to Posts
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {posts.length} posts, {pendingClaimsCount} pending claims
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