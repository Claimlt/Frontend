
function RecentActivities() {
  return (
    <div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-semibold mb-4">Recent Activities</h3>
            {[1, 2, 3].map(activity => (
              <div key={activity} className="mb-3 last:mb-0">
                <p className="text-sm">
                  <span className="font-medium">user_{activity}</span> liked your post
                </p>
                <p className="text-xs text-gray-500">30 minutes ago</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default RecentActivities