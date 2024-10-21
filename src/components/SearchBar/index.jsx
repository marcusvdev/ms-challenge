import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="w-full flex justify-start items-center relative">
            <FiSearch className="absolute left-2 text-[#7B8C98]" />
            <input
                type="text"
                placeholder="Search movies or series..."
                className="w-full max-h-[30px] px-4 py-2 pl-8 rounded-lg border border-gray-400 text-gray-800"
                value={query}
                onChange={handleChange}
            />
        </div>
    );
}
