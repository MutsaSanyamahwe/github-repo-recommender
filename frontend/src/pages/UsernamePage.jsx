import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernamePage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recommend, setrecommendation] = useState([]);



    const handleSearch = async () => {

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://github-repo-recommender.onrender.com/recommend?username=${username}`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            navigate("/RepoPage", {
                state: { repos: data.recommended_repos }
            });


        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }

    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('/github2.webp')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Glass Card */}
            {/* Solid Card */}
            <div className="relative z-10 bg-slate-300 rounded-3xl p-10 max-w-lg w-full text-center shadow-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    GitHub Repo Recommender
                </h1>
                <p className="text-gray-700 mb-6">
                    Enter your GitHub username to get personalized repository recommendations.
                </p>

                <div className="flex gap-3 justify-center">
                    <input
                        type="text"
                        placeholder="GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 outline-none flex-1"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-black px-5 py-3 rounded-xl hover:bg-gray-600 transition text-white font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Search"}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default UsernamePage;
