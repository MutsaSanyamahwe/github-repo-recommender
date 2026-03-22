import { useLocation } from "react-router-dom";
import { Star, Tag } from 'lucide-react'


function RepoPage() {
    const location = useLocation();
    const repos = location.state?.repos || [];

    return (
        <div className="bg-slate-300 min-h-screen p-10">
            <h1 className="text-2xl font-bold mb-4">Recommended Repos</h1>

            {repos.length === 0 ? (
                <p>No recommendations found.</p>
            ) : (
                <ul className="space-y-3">
                    {repos.map((repo, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                            {/* Repo name clickable */}
                            <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                {repo.name}
                            </a>

                            {/* Description */}
                            <p className="text-sm text-gray-700 mt-1">{repo.description}</p>

                            {/* Stars & Language */}
                            <div className="flex mt-2 text-xs text-gray-500">
                                <Star className="w-4 h-4 text-yellow-500 mr-1 pr-0" />
                                <span> {repo.stars.toLocaleString()}</span>
                                <Tag className="w-4 h-4 ml-4 mr-1 text-gray-500" />
                                {repo.language && <span> {repo.language}</span>}
                            </div>

                            {/* Topics / Tags */}
                            {repo.topics && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {repo.topics.split(" ").map((topic, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RepoPage;