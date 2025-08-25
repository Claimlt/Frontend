

function RecomondedUsers() {
  return (
    <div>
         <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">Suggestions For You</h3>
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/pasindu.jpg"
                      alt="user profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">user_{item}</p>
                    <p className="text-xs text-gray-500">Suggested for you</p>
                  </div>
                </div>
                <button className="text-[#3a63b8] text-xs font-semibold">Follow</button>
              </div>
            ))}
          </div>
    </div>
  )
}

export default RecomondedUsers