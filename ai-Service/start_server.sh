#!/bin/bash

# CortexDoc Backend Startup Script

echo "🚀 Starting CortexDoc AI Service..."
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please create one with: python3 -m venv venv"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Check if uvicorn is installed
if ! python -c "import uvicorn" 2>/dev/null; then
    echo "📦 Installing uvicorn..."
    pip install uvicorn
fi

# Ensure uploads directory exists
mkdir -p uploads

echo "✅ Starting server on http://127.0.0.1:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
