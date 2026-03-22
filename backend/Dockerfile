# Using slim image for smaller size but add build tools
FROM python:3.12-slim


WORKDIR /app

# Installing system dependencies for building Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    python3-dev \
    libbz2-dev \
    liblzma-dev \
    libsqlite3-dev \
    zlib1g-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copying requirements first for Docker caching
COPY requirements.txt .

# Upgrading pip to get pre-built wheels for new packages
RUN pip install --upgrade pip

# Instalingl Python dependencies
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

EXPOSE 8000

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]