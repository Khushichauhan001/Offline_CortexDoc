#!/bin/bash

echo " Starting CortexDoc Setup..."

# -------------------------------
#  Info
# -------------------------------
echo " Note:"
echo "- Internet required for first setup (model download)"
echo "- After setup, app works completely offline"
echo ""

# -------------------------------
#  Warning before model download
# -------------------------------
echo " This will download ~4GB model (phi3)"
echo "Do you want to continue? (y/n)"
read confirm

if [ "$confirm" != "y" ]; then
    echo " Setup cancelled by user"
    exit 1
fi

# -------------------------------
#  Check Ollama
# -------------------------------
if ! command -v ollama &> /dev/null
then
    echo " Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
else
    echo " Ollama already installed"
fi

# -------------------------------
#  Pull Model
# -------------------------------
echo "🤖 Pulling phi3 model..."
ollama pull phi3

# -------------------------------
#  Free Ports
# -------------------------------
echo " Cleaning old processes..."

fuser -k 8000/tcp 2>/dev/null
fuser -k 3000/tcp 2>/dev/null
fuser -k 3001/tcp 2>/dev/null

# -------------------------------
#  Start Backend
# -------------------------------
echo " Starting Backend..."

cd ai-Service || { echo " ai-Service folder not found"; exit 1; }

# create venv if not exists
if [ ! -d "venv" ]; then
    echo " Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing backend dependencies..."
pip install -r requirements.txt

echo " Running FastAPI server on port 8000..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 &

BACKEND_PID=$!

cd ..

# -------------------------------
#  Start Frontend
# -------------------------------
echo " Starting Frontend..."

cd client || { echo " client folder not found"; exit 1; }

echo " Installing frontend dependencies..."
npm install

echo ""
echo " App will open at: http://localhost:3000"
echo " Press CTRL + C to stop everything"
echo ""

# -------------------------------
#  Handle shutdown
# -------------------------------
cleanup() {
    echo ""
    echo " Stopping CortexDoc..."
    kill $BACKEND_PID 2>/dev/null
    echo " Backend stopped"
    exit 0
}

trap cleanup SIGINT

# -------------------------------
#  Run frontend (foreground)
# -------------------------------
npm run dev