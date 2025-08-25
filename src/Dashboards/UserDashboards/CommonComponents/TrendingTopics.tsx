
function TrendingTopics() {
  return (
    <div>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">Trending Topics</h3>
            {["#LostPhone", "#FoundWallet", "#MissingBook"].map((topic, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <p className="font-medium text-sm">{topic}</p>
                <p className="text-xs text-gray-500">125 posts</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default TrendingTopics