"""
This function will be used to feed the TF-IDF vector
"""
def build_repo_text(repo):
    return f"{repo["name"]} {repo["description"]} {repo["language"]} {repo["topics"]}"
