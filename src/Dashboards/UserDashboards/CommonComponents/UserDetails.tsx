
function UserDetails() {
     const storedName = localStorage.getItem("user");
    
    return (
        <div>
           
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                            <img
                                src={""}
                                alt={""}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-semibold">{storedName}</h2>
                            {/* <p className="text-gray-500 text-sm">{user}</p> */}
                        </div>
                    </div>

                    <div className="flex justify-between text-center mb-6">
                        <div>
                            <p className="font-bold">{""}</p>
                            <p className="text-gray-500 text-sm">Posts</p>
                        </div>
                        <div>
                            <p className="font-bold">{""}</p>
                            <p className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div>
                            <p className="font-bold">{""}</p>
                            <p className="text-gray-500 text-sm">Following</p>
                        </div>
                    </div>

                    <button className="w-full bg-[#3a63b8] text-white py-2 rounded-lg font-medium hover:bg-[#2c4a8a] transition">
                        Edit Profile
                    </button>
                </div>
           
        </div>
    )
}

export default UserDetails