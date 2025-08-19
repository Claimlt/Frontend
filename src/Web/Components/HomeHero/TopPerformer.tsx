export function TopPerformer() {
    const topUsers = [
        { id: 1, name: "Alex Johnson", itemsReturned: 42, badge: "Gold", avatar: "/avatar1.jpg" },
        { id: 2, name: "Maria Garcia", itemsReturned: 37, badge: "Gold", avatar: "/avatar2.jpg" },
        { id: 3, name: "James Wilson", itemsReturned: 29, badge: "Silver", avatar: "/avatar3.jpg" },
        { id: 4, name: "Sarah Lee", itemsReturned: 25, badge: "Silver", avatar: "/avatar4.jpg" },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">Our Top Helpers</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topUsers.map(user => (
                        <div key={user.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-200">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                            <p className="text-gray-600 mb-2">Returned {user.itemsReturned} items</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                user.badge === "Gold" ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-800"
                            }`}>
                {user.badge} Helper
              </span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="text-blue-700 hover:text-blue-900 font-medium flex items-center justify-center mx-auto">
                        View All Top Helpers
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}