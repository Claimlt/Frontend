export function RecentItems() {
    const recentItems = [
        { id: 1, title: "Lost Wallet", type: "lost", location: "Central Park", date: "2 hours ago", image: "/wallet.jpg" },
        { id: 2, title: "Found Keys", type: "found", location: "Main Street", date: "5 hours ago", image: "/keys.jpg" },
        { id: 3, title: "Lost Smartphone", type: "lost", location: "City Mall", date: "1 day ago", image: "/phone.jpg" },
        { id: 4, title: "Found Backpack", type: "found", location: "University", date: "2 days ago", image: "/backpack.jpg" },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Recently Reported Items</h2>
                    <button className="text-blue-700 hover:text-blue-900 font-medium">
                        View All Items
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                            <div className="h-48 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                                    }`}>
                    {item.type}
                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {item.location}
                                </div>
                                <div className="flex items-center text-gray-500 text-xs">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {item.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}