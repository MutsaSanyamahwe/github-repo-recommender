import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col justify-between relative"
            style={{ backgroundImage: "url('/github2.webp')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* the Top Hero Text */}
            <div className="relative z-10 text-center text-white px-6 pt-16 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                    Welcome to GitHub Repo Recommender
                </h1>
                <p className="text-lg font-bold mb-4 drop-shadow-md">
                    Enter your GitHub username and let us analyze your repos to find similar projects you’ll love.
                </p>
                <p className="text-lg mb-6 drop-shadow-md text-white/90">
                    Discover trending repos, uncover hidden gems, and explore projects tailored to your style, all in one place!
                </p>
            </div>

            {/* Bottom Container with Button */}
            <div className="relative z-10 text-center mb-16">
                <button
                    onClick={() => navigate("/UsernamePage")}
                    className="bg-black border border-white px-12 py-4 rounded-xl text-white font-semibold hover:bg-gray-600 transition shadow-xl mb-6"
                >
                    Get Started
                </button>

                {/* Bottom Glassy Tagline */}
                <div className="mx-auto w-11/12 max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl p-6 text-center shadow-xl">
                    <p className="text-white text-lg font-medium drop-shadow-md mb-2">
                        Discover trending repos, hidden gems, and projects tailored to your coding style!
                    </p>
                    <p className="text-white/70 text-sm">
                        Enter your GitHub username above and let the magic begin.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;