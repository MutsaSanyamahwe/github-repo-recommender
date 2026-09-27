from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from github_service import get_user, GitHubUserNotFound
from utils import build_repo_text
from recommender import recommend_repos
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Github Repo Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    username: str

@app.get("/")
def home():
    return {"message": "GitHub Repo Recommender is running"}

@app.post("/recommend")
def recommend(request: UserRequest):
    username = request.username.strip()

    if not username:
        return JSONResponse(status_code=400, content={"error": "Please enter a GitHub username."})

    try:
        user_repos = get_user(username)
    except GitHubUserNotFound:
        return JSONResponse(status_code=404, content={"error": f"GitHub user '{username}' does not exist."})
    except Exception as e:
        # Catch-all so we never return a bare unhandled 500 (which drops CORS headers
        # and shows up in the browser as a misleading "CORS blocked" error).
        print(f"Unexpected error fetching user '{username}': {e}")
        return JSONResponse(status_code=502, content={"error": "Could not reach GitHub right now. Please try again shortly."})

    if not user_repos:
        return JSONResponse(status_code=404, content={"error": "That user has no public repositories to base recommendations on."})

    user_texts = [build_repo_text(r) for r in user_repos]
    recommedations = recommend_repos(user_texts, top_n=5)

    return {"recommended_repos": recommedations}
