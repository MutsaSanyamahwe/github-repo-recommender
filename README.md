# RepoRecommender

**Live Demo:** [GitHub Repo Recommender](https://github-repository-recommender.onrender.com/)

## The Problem

Once a developer platform knows what someone has built, the obvious next question is: **what else should they see?**

Most "discover more" features on developer-facing platforms fall back to generic sorting — most stars, most recent, most popular language — none of which is personalized to the individual. A React developer building small UI tools and a React developer building large-scale data dashboards look identical to a stars-sort, but they're interested in completely different projects. Nobody was matching repository *style* — the actual mix of language, topic, and description — to what a specific person has already built.

## What RepoRecommender Is

RepoRecommender is a **similarity engine for repositories**, not a search box. Give it a GitHub username, and it returns repositories from a pre-built corpus that share the same underlying style — language, topics, and description — as what that person has already shipped.

It works by placing a user's repos into an existing landscape of clustered projects, rather than clustering the user's repos in isolation. That landscape is built once, offline, and reused for every request.

## System Flow

The system runs in two separate phases: a one-time offline training pass, and a fast per-request lookup that reuses it.

```
OFFLINE — run once via train_model.ipynb
────────────────────────────────────────
 Search GitHub across a fixed set of
 languages (Python, JS, Java, Go, Rust)
                │
                ▼
 Build a text feature per repo:
 name + description + language + topics
                │
                ▼
 Fit a TF-IDF vectorizer  +  Fit a K-means model
 on that corpus
                │
                ▼
 Save to disk: vectorizer.pkl · kmeans.pkl · repos.pkl
 (shipped with the backend — no training at request time)


AT REQUEST TIME — POST /recommend
────────────────────────────────────────
        GitHub username
                │
                ▼
 Fetch that user's public repositories
                │
                ▼
 Build the same text feature
 (name + description + language + topics)
                │
                ▼
 Transform with the pre-trained TF-IDF vectorizer
                │
                ▼
 Predict cluster(s) with the pre-trained K-means model
                │
                ▼
 Pull repos from those same clusters out of the
 pre-built corpus, dedupe, return the top 5
```

The key distinction: **the user's own repos are never clustered against each other.** They're used purely to find which pre-existing cluster of *other* developers' repos best matches their style — recommendations come from that cluster, not from the user's own project history.

## Tech Stack

- **Backend:** FastAPI, Python, Pydantic, Requests, scikit-learn (TF-IDF + K-means)
- **Frontend:** React, Tailwind CSS, Vite
- **Deployment:** Docker, Render

## Where RepoRecommender Sits in the Ecosystem

RepoRecommender is linked from [DevMatch's](https://devmatch-1-hj4i.onrender.com/) Explore page as a related system — a developer can jump from matching with people to discovering repos in their style — but it isn't embedded directly into DevMatch's matching flow, and it doesn't call or get called by [DevVerify](https://devverify-system-1.onrender.com/). Each of the three services does one job and stays independent of the others' internals.

## Getting Started (Local Development)

### Backend

```bash
# Clone the repo
git clone https://github.com/MutsaSanyamahwe/github-repo-recommender.git
cd github-repo-recommender/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend loads `vectorizer.pkl`, `kmeans.pkl`, and `repos.pkl` from the `backend/` directory at startup — no training step is needed to run the API, those artifacts are already included in the repo.

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Retraining the Model

To rebuild the corpus and retrain the clustering model with a different set of languages or a larger sample, open `backend/train_model.ipynb` and run it end to end. It will regenerate `vectorizer.pkl`, `kmeans.pkl`, and `repos.pkl` in place.

## Project Structure

```
github-repo-recommender/
├── backend/
│   ├── main.py              # FastAPI app, POST /recommend
│   ├── github_service.py    # Fetches a user's public repos from the GitHub API
│   ├── recommender.py       # Loads pickled models, predicts cluster, returns top 5
│   ├── utils.py             # Builds the text feature fed into TF-IDF
│   ├── train_model.ipynb    # Offline corpus collection + model training
│   ├── vectorizer.pkl       # Pre-trained TF-IDF vectorizer
│   ├── kmeans.pkl           # Pre-trained K-means model
│   ├── repos.pkl            # Pre-built corpus of repos used for recommendations
│   ├── requirements.txt
│   └── Dockerfile
└── frontend/
    └── src/
        ├── pages/
        └── components/
```

## License

No license file is currently included in this repository.

Repo: [github.com/MutsaSanyamahwe/github-repo-recommender](https://github.com/MutsaSanyamahwe/github-repo-recommender)
