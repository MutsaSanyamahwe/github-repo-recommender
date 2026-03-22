import { useState } from "react";

function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", query);
        // later → call backend
    };

    return (
        <div className="flex gap-3">
            <input
                type="text"
                placeholder="Enter repo description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-gray-800 text-white outline-none"
            />

            <button
                onClick={handleSearch}
                className="bg-indigo-600 px-5 rounded-xl hover:bg-indigo-700"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;