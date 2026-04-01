@echo off
echo Starting CortexDoc Setup...

echo Note:
echo - Internet required for first setup (model download)
echo - After setup, app works completely offline
echo.

echo  This will download ~4GB model (phi3)
set /p confirm=Do you want to continue? (y/n):

if /I not "%confirm%"=="y" (
    echo  Setup cancelled
    exit /b
)

:: Check Ollama
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Ollama...
    powershell -Command "iwr https://ollama.com/install.ps1 -UseBasicParsing | iex"
) else (
    echo Ollama already installed
)

echo  Pulling phi3 model...
ollama pull phi3

echo  Cleaning old processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /PID %%a /F >nul 2>&1

:: Backend
cd ai-Service

if not exist venv (
    python -m venv venv
)

call venv\Scripts\activate
pip install -r requirements.txt

start cmd /k uvicorn app.main:app --host 0.0.0.0 --port 8000

cd ..

:: Frontend
cd client
npm install

echo.
echo  Open: http://localhost:3000
echo  Close terminal windows to stop

start cmd /k npm run dev