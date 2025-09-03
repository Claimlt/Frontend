import axios from "axios";
import { useEffect, useState } from "react";
import type { Post } from "../../../../Utils/PropsInterface";
import LoadingBanner from "./Banners/LoadingBanner";
import SkeletonPost from "./Banners/SkeletonPost";
import ClaimModel, { type ClaimModalProps } from "../CommonComponents/ClaimModel";

function UserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimModal, setClaimModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [allprofiles, setAllProfiles] = useState<any[]>([]);

  const openClaimModal = (post: Post) => {
    setSelectedPost(post);
    setClaimModal(true);
  }

  const closeClaimModal = () => {
    setClaimModal(false);
    setSelectedPost(null);
  }
  
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchAllProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/all-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllProfiles(response.data.data ?? []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfile();
    fetchPosts();
  }, [token]);

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4">
      <LoadingBanner />
      {[1, 2].map(item => <SkeletonPost key={item} />)}
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
        {error}
      </div>
    </div>
  );
  
  if (posts.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
        <div className="text-blue-900 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-600">No posts available</p>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto px-4 pb-8">
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="flex space-x-5 mb-4 overflow-x-auto pb-2 hide-scrollbar">
          {allprofiles.map((profile, index) => (
            <div key={index} className="flex flex-col items-center shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-[#1a2d57] p-0.5 mb-1.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={profile.avatar?.url || "/default-avatar.png"} 
                    alt="user profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-700 font-medium truncate max-w-[64px]">
                {profile.first_name} 
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-9 h-9 rounded-full border border-[#1a2d57] p-0.5 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                src="/pasindu.jpg"
                alt="user profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="What's new to report?"
            className="flex-1 bg-white border border-gray-200 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1a2d57] transition-all"
          />
        </div>
      </div>
 
      {posts.map((post, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#1a2d57] p-0.5 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={"/pasindu.jpg"}
                    alt="user profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">User Name</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{post.title}</h3>
            <p className="mb-3 text-gray-700 leading-relaxed">{post.description}</p>

            {post.images && post.images.length > 0 && (
              <div className="h-80 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={(post.images[0].url)}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-3">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">2</span>
              </button>
              <button className="flex items-center space-x-1.5 text-gray-500 hover:text-[#1a2d57] transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">2</span>
              </button>
            </div>
            <button
              onClick={() => openClaimModal(post)}
              className="flex items-center space-x-2 bg-[#1a2d57] hover:bg-[#152547] text-white py-2 px-4 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Claim this</span>
            </button>
          </div>
        </div>
      ))}
      
      <ClaimModel
        postDetails={selectedPost as ClaimModalProps["postDetails"]}
        isOpen={claimModal}
        onClose={closeClaimModal}
      />
      
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default UserPosts;