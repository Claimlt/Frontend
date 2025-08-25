import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function Users() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', posts: 12, joined: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', posts: 7, joined: '2023-02-20' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'suspended', posts: 3, joined: '2023-03-10' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', posts: 15, joined: '2023-01-28' },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'inactive', posts: 0, joined: '2023-04-05' },
    ];
    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Posts</th>
                                <th className="py-3 px-4 text-left">Joined</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                                            user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{user.posts}</td>
                                    <td className="py-3 px-4">{user.joined}</td>
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

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-gray-600">Showing 5 of 1243 users</p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                            Previous
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 font-medium">
                            1
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                            2
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users