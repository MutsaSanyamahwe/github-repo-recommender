function RepoCard({ repo }) {
    return (
        <div className="bg-gray-slate-200 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">{repo.name}</h2>
            <p className="text-gray-400">{repo.description}</p>

            <a
                href={repo.url}
                target="_blank"
                className="text-indigo-400 mt-2 inline-block"
            >
                View Repo →
            </a>
        </div>
    );
}

export default RepoCard;