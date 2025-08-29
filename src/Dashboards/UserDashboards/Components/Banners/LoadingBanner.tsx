export default function LoadingBanner() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-pulse">
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map(story => (
          <div key={story} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 p-0.5 mb-1">
              <div className="w-full h-full rounded-full bg-gray-300"></div>
            </div>
            <span className="text-xs bg-gray-300 text-transparent rounded">user_{story}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex-1 bg-gray-200 rounded-full py-2 px-4 text-sm h-10"></div>
      </div>
    </div>
  )
}