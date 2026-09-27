import requests
from time import sleep

GITHUB_API_URL = "https://api.github.com"


class GitHubUserNotFound(Exception):
    """Raised when the GitHub username does not exist."""
    pass


def get_user(username: str, retries: int = 3):
    url = f"{GITHUB_API_URL}/users/{username}/repos"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "github-recommender-app"
    }

    last_error = None

    for attempt in range(1, retries + 1):
        try:
            response = requests.get(url, headers=headers, timeout=10)

            # A 404 means the username doesn't exist - no point retrying.
            if response.status_code == 404:
                raise GitHubUserNotFound(f"GitHub user '{username}' not found")

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

        except GitHubUserNotFound:
            # Don't retry - re-raise immediately so the caller can show a clear message.
            raise

        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt} failed: {e}")
            last_error = e
            if attempt < retries:
                sleep(2)  # small delay before retry

    # If all attempts fail (rate limit, timeout, network issue, etc.)
    print(f"All {retries} attempts failed. Last error: {last_error}")
    return []
