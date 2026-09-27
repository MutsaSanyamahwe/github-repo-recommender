import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernamePage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recommend, setrecommendation] = useState([]);



    const BACKEND_URL = "https://github-repo-recommender-production.up.railway.app/recommend";

    const handleSearch = async () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError("Please enter a GitHub username.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check the username exists on GitHub first, so we can give a fast,
            // clear message instead of a confusing failure from our own backend.
            const ghCheck = await fetch(`https://api.github.com/users/${encodeURIComponent(trimmedUsername)}`);

            if (ghCheck.status === 404) {
                throw new Error(`GitHub user "${trimmedUsername}" does not exist.`);
            }
            if (!ghCheck.ok) {
                // e.g. GitHub API rate limit (403) or a transient GitHub outage
                throw new Error("Couldn't verify that username with GitHub right now. Please try again shortly.");
            }

            const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: trimmedUsername }),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("The server returned an unexpected response. Please try again.");
            }

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (!data.recommended_repos || data.recommended_repos.length === 0) {
                throw new Error("No recommendations found for that user.");
            }

            navigate("/RepoPage", {
                state: { repos: data.recommended_repos }
            });

        } catch (err) {
            if (err instanceof TypeError) {
                // fetch() throws a generic TypeError on network failure / CORS / DNS issues
                setError("Couldn't reach the recommendation service. It may be down or unreachable right now.");
            } else {
                setError(err.message);
            }

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

                {error && (
                    <p className="mt-4 text-red-600 font-medium">
                        {error}
                    </p>
                )}
            </div>

        </div>
    );
}

export default UsernamePage;
