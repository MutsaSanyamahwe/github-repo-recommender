from fastapi import FastAPI
from github_service import get_user
from utils import build_repo_text
from recommender import recommend_repos
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Github Repo Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "GitHub Repo Recommender is running"}

@app.post("/recommend")
def recommend(username:str):
    user_repos = get_user(username)
    if not user_repos:
        return {"error": "User not found or no public repos."}
    
    user_texts = [build_repo_text(r) for r in user_repos]
    recommedations = recommend_repos(user_texts, top_n=5)

    return {"recommended_repos": recommedations}