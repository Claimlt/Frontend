import { useState } from "react";
import {
    FaPlus,
    FaFilter,

} from "react-icons/fa";
function Fillters() {
      const [showFilters, setShowFilters] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                    <button
                        className="flex items-center space-x-2 bg-[#3a63b8] text-white py-2 px-4 rounded-lg hover:bg-[#2c4a8a] transition"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FaFilter />
                        <span>Filters</span>
                    </button>

                    <button className="flex items-center space-x-2 bg-[#3a63b8] text-white py-2 px-4 rounded-lg hover:bg-[#2c4a8a] transition">
                        <FaPlus />
                        <span>Add New</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Fillters