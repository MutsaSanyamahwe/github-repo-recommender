# GitHub Repo Recommender

A simple web app that recommends GitHub repositories based on your profile. Enter your GitHub username and get personalized repository suggestions using machine learning on your public repos.

## Live Demo
- Fully functional **live app**: no local setup required to try recommendations

Check it out here: [GitHub Repo Recommender Live](https://github-repository-recommender.onrender.com)

##  Features

- Fetch GitHub repositories for a user
- Analyze repository topics, descriptions, and content
- Recommend the top 5 repositories most relevant to the user
- Uses **K-means clustering** to group similar repositories and generate recommendations
- Fully deployed backend with FastAPI and hosted on Render
- Frontend built with React + Tailwind CSS

## How It Works

1. Fetch all public repositories for a given GitHub username.
2. Extract textual features from repo descriptions, topics, and readme content.
3. Use TF-IDF to vectorize the text.
4. Apply **K-means clustering** to group similar repositories.
5. Recommend the top 5 repositories closest to the user’s clusters.

##  Tech Stack

- **Backend:** FastAPI, Python, Pydantic, Requests,**scikit-learn (K-means clustering)**
- **Frontend:** React, Tailwind CSS, Vite
- **Deployment:** Render (backend), planned frontend deployment

##  Getting Started (Local Development)

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
###Frontend

```bash
cd ../frontend
npm install
npm run dev
```

##  License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

