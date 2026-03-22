import requests

GITHUB_API_URL = "https://api.github.com"

def get_user(username: str, retries: int = 3):
    url = f"{GITHUB_API_URL}/users/{username}/repos"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "github-recommender-app"
    }

    for attempt in range(1, retries + 1):
        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            repos = response.json()

            result = []
            for repo in repos:
                result.append({
                    "name": repo.get("name"),
                    "description": repo.get("description") or "",
                    "language": repo.get("language") or "",
                    "topics": " ".join(repo.get("topics", [])) if repo.get("topics") else "",
                    "url": repo.get("html_url")
                })
            return result

        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt} failed: {e}")
            sleep(2)  # adding a small delay before retry

    # If all attempts fail, return empty list
    return []

