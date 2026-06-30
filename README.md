# GitHub Repo Recommender

A simple web app that recommends GitHub repositories based on your profile. Enter your GitHub username and get repository suggestions pulled from a pre-clustered corpus of public repos that match the topics, languages, and descriptions of what you've built.

## Live Demo

Fully functional live app — no local setup required to try it.

Check it out here: [GitHub Repo Recommender Live](https://github-repository-recommender.onrender.com/)

## Features

- Fetch a GitHub user's public repositories
- Build text features from each repo's name, description, language, and topics
- Vectorize that text with a pre-trained TF-IDF vectorizer
- Assign the user's repos to clusters from a pre-trained K-means model
- Recommend the top 5 repositories from a pre-built corpus that fall in the same clusters
- Fully deployed backend with FastAPI, hosted on Render
- Frontend built with React + Tailwind CSS

## How It Works

The clustering model isn't trained live — it's trained offline once and shipped with the backend as pickled artifacts (`vectorizer.pkl`, `kmeans.pkl`, `repos.pkl`).

**Offline (one-time, via `train_model.ipynb`):**
1. Search GitHub for repositories across a fixed set of languages (Python, JavaScript, Java, Go, Rust)
2. Build a text feature from each repo's name, description, language, and topics
3. Fit a TF-IDF vectorizer and a K-means model on that corpus
4. Save the fitted vectorizer, the fitted K-means model, and the corpus itself to disk

**At request time:**
1. Fetch the requested GitHub username's public repositories
2. Build the same text feature (name + description + language + topics) for each of their repos
3. Transform that text with the pre-trained TF-IDF vectorizer
4. Predict which existing cluster(s) the user's repos fall into using the pre-trained K-means model
5. Pull repositories from those same clusters out of the pre-built corpus, dedupe, and return the top 5

In short: the user's repos aren't clustered against each other — they're used to find which pre-existing cluster of other developers' repos best matches their style, and recommendations come from that cluster.

## Tech Stack

- **Backend:** FastAPI, Python, Pydantic, Requests, scikit-learn (TF-IDF + K-means)
- **Frontend:** React, Tailwind CSS, Vite
- **Deployment:** Docker, Render

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

