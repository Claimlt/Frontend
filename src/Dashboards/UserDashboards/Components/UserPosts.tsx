

function UserPosts() {
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

      {[1].map(post => (
        <div key={post} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200">
                <img
                  src="/pasindu.jpg"
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">user_{post}</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <button>⋯</button>
          </div>

          <div className="mb-4">
            <p className="mb-2">Found this item near the campus library. Please contact if it's yours!</p>
            <div className="h-80 bg-gray-200 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="post"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-between text-gray-500">
            <button className="flex items-center space-x-1">
              <span>❤️</span>
              <span>24</span>
            </button>
            <button className="flex items-center space-x-1">
              <span>💬</span>
              <span>5</span>
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