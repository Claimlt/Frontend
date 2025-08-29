import axios from "axios"
import { useEffect, useState } from "react"
import type { Post } from "../../../../Utils/PropsInterface";

function UserPosts() {
const [posts, setPosts] = useState<Post[]>([]);
     const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        setPosts(response.data.data)
      } catch (err) {
        setError("Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts();
  }, [])

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map(story => (
            <div key={story} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#3a63b8] p-0.5 mb-1">
                <div className="w-full rounded-full overflow-hidden">
                  <img
                    src="/pasindu.jpg"
                    alt="user profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs">user_{story}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200">
            <img
              src="/pasindu.jpg"
              alt="user profile"
              className="w-full h-full object-cover"
            /></div>
          <input
            type="text"
            placeholder="What's new to report?"
            className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none"
          />
        </div>
      </div>

      {posts.map((post, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={"/pasindu.jpg"}  
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">User ID: </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <button>⋯</button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-1">{post.title}</h3>
            <p className="mb-2">{post.description}</p>

            {post.images && post.images.length > 0 && (
              <div className="h-80 bg-gray-200 rounded-lg">
                <img
                  src={post.images[0].url}   
                  alt="post"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between text-gray-500">
            <button className="flex items-center space-x-1">
              <span>❤️</span>
              <span>2</span>
            </button>
            <button className="flex items-center space-x-1">
              <span>💬</span>
              <span>2</span>
            </button>
            <button className="flex items-center space-x-1">
              <span>↗️</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserPosts