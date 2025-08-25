import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";


function Reports() {
    const reportedPosts = [
        { id: 1, title: 'Lost Wallet', user: 'John Doe', reports: 3, status: 'under review' },
        { id: 2, title: 'Found Phone', user: 'Jane Smith', reports: 5, status: 'resolved' },
        { id: 3, title: 'Missing Book', user: 'Robert Johnson', reports: 2, status: 'pending' },
    ];

    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left">Post</th>
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Reports</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedPosts.map(post => (
                                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{post.title}</td>
                                    <td className="py-3 px-4">{post.user}</td>
                                    <td className="py-3 px-4">{post.reports}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                            post.status === 'under review' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <button className="p-1 text-blue-600 hover:text-blue-800">
                                                <FaEye />
                                            </button>
                                            <button className="p-1 text-green-600 hover:text-green-800">
                                                <FaEdit />
                                            </button>
                                            <button className="p-1 text-red-600 hover:text-red-800">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Reports