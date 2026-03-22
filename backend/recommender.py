import pickle
import numpy as np

#Loading pre-trained model for feature engineering( turning text into numeric vectors)
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

#Loading the K-Means clustering model
with open("kmeans.pkl", "rb") as f:
    kmeans = pickle.load(f)

#Loading the saved repos to be used later to display recommended repos
with open("repos.pkl", "rb") as f:
    all_repos_data = pickle.load(f)

def recommend_repos(user_repos_texts, top_n=5):
    #Transforming user repos to numeric values
    X_user = vectorizer.transform(user_repos_texts)
    user_clusters = kmeans.predict(X_user)

    recommended = []

    for cluster in user_clusters:
        cluster_indices = np.where(kmeans.labels_ == cluster)[0]
        for idx in cluster_indices:
            recommended.append(all_repos_data[idx])

    #Removing duplicates and excluding user's own repos
    unique_repos = [dict(t) for t in {tuple(d.items()) for d in recommended}]
    return unique_repos[:top_n]
    
   





    

