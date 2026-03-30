# 🚀 CortexDoc - Quick Start Guide

## ✅ What's New

### Multi-Format Document Support
- **PDF** documents
- **Text files** (.txt)
- **Word documents** (.docx)
- **Images** (.jpg, .png, .bmp, .tiff) with OCR

### Multiple File Upload
- Upload multiple files at once
- View all uploaded files in sidebar
- Remove individual files
- Track upload status per file

---

## 📋 Prerequisites

### Backend Requirements
```bash
Python 3.8+
Virtual environment (already created in ai-Service/venv)
```

### Frontend Requirements
```bash
Node.js 16+
npm 7+
```

---

## 🎯 Step-by-Step Setup

### Step 1: Start the Backend Server

**Option A: Using the startup script (Recommended)**
```bash
cd ai-Service
./start_server.sh
```

**Option B: Manual start**
```bash
cd ai-Service
source venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ Backend is now running at `http://127.0.0.1:8000`

---

### Step 2: Start the Frontend

**Open a NEW terminal window**, then:

```bash
cd client
npm install  # (if not already done)
npm run dev
```

**Expected output:**
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

✅ Frontend is now running at `http://localhost:3000`

---

## 🎨 Using the Application

### Landing Page (`http://localhost:3000`)
1. Visit the landing page
2. See the animated hero section
3. Scroll down to view features
4. Click **"Get Started"** to go to the app

### Main App (`http://localhost:3000/app`)

#### Uploading Files
1. Click **"Upload Files"** button in the left sidebar
2. Select one or more files:
   - PDF documents
   - Text files (.txt)
   - Word documents (.docx)  
   - Images (.jpg, .png, etc.)
3. Files will upload automatically
4. See upload status and chunk count for each file
5. Upload multiple batches as needed

#### Asking Questions
1. Type your question in the input box at the bottom
2. Press **Enter** or click the send button
3. AI will respond with typing animation
4. Chat auto-scrolls to latest message

#### Theme Toggle
- Click the sun/moon icon (top-right) to switch between dark/light mode
- Theme preference is saved automatically

---

## 📦 Supported File Types

| Format | Extension | Notes |
|--------|-----------|-------|
| PDF | `.pdf` | Standard PDF documents |
| Text | `.txt` | Plain text files |
| Word | `.docx` | Microsoft Word (not .doc) |
| Images | `.jpg`, `.jpeg`, `.png`, `.bmp`, `.tiff` | Requires OCR (pytesseract) |

---

## 🔧 Optional: Image OCR Setup

To enable image text extraction, install:

```bash
cd ai-Service
source venv/bin/activate

# Install Python packages
pip install pytesseract pillow

# Install tesseract engine (Ubuntu/Debian)
sudo apt-get install tesseract-ocr

# Or on macOS
brew install tesseract
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "ModuleNotFoundError"**
```bash
cd ai-Service
source venv/bin/activate
pip install -r requirements.txt
```

**Error: "Port 8000 already in use"**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9

# Or use a different port
uvicorn app.main:app --port 8001
```

### Frontend issues

**Error: "Failed to get response"**
- ✅ Make sure backend is running at `http://127.0.0.1:8000`
- ✅ Check browser console for errors
- ✅ Verify CORS is enabled in backend

**Error: "Upload failed"**
- ✅ Check file format is supported
- ✅ Verify `uploads/` directory exists in ai-Service
- ✅ Check backend console for error details

**Error: "Connection refused"**
- ✅ Confirm backend is running: `curl http://127.0.0.1:8000`
- ✅ Check firewall settings

### Common Issues

**Images not uploading?**
- Install pytesseract and tesseract-ocr (see Optional Setup above)

**DOCX files failing?**
```bash
cd ai-Service
source venv/bin/activate
pip install python-docx
```

**Dark mode not persisting?**
- Clear browser cache and localStorage
- Try in incognito mode

---

## 📂 Project Structure

```
Offline_CortexDoc/
├── ai-Service/              # Backend (FastAPI + AI)
│   ├── app/
│   │   ├── main.py          # API endpoints + CORS
│   │   ├── loaders/         # Document loaders
│   │   │   ├── pdf_loader.py
│   │   │   ├── txt_loader.py
│   │   │   ├── docx_loader.py
│   │   │   └── image_loader.py
│   │   ├── rag/             # RAG pipeline
│   │   └── utils/           # Text processing
│   ├── uploads/             # Uploaded files
│   ├── venv/                # Python virtual env
│   └── start_server.sh      # Startup script
│
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Landing + App pages
│   │   ├── services/        # API calls
│   │   └── context/         # Theme + Toast
│   └── public/
│
└── START_HERE.md            # This file
```

---

## 🎉 Features

✅ **Multi-format support** - PDF, TXT, DOCX, Images  
✅ **Multiple file upload** - Upload several files at once  
✅ **Real-time chat** - ChatGPT-like interface  
✅ **Typing animation** - Smooth AI response reveal  
✅ **Dark/light mode** - Persistent theme switching  
✅ **Toast notifications** - Success/error feedback  
✅ **Glassmorphism UI** - Modern, premium design  
✅ **Auto-scroll** - Chat always shows latest message  
✅ **File management** - View and remove uploaded files  
✅ **Offline AI** - Everything runs locally  

---

## 📚 API Endpoints

### POST `/upload`
Upload one or more documents

**Request:**
```bash
curl -X POST http://127.0.0.1:8000/upload \
  -F "files=@document.pdf" \
  -F "files=@notes.txt"
```

**Response:**
```json
{
  "message": "Documents processed and stored in FAISS",
  "num_chunks": 125,
  "files": [
    {
      "filename": "document.pdf",
      "status": "success",
      "chunks": 89
    },
    {
      "filename": "notes.txt",
      "status": "success",
      "chunks": 36
    }
  ]
}
```

### GET `/query?q=...`
Ask a question

**Request:**
```bash
curl "http://127.0.0.1:8000/query?q=What+is+the+main+topic?"
```

**Response:**
```json
{
  "query": "What is the main topic?",
  "answer": "The main topic is...",
  "context": ["relevant chunk 1", "relevant chunk 2"]
}
```

---

## 🔗 Quick Links

- Frontend: `http://localhost:3000`
- Backend API: `http://127.0.0.1:8000`
- API Docs: `http://127.0.0.1:8000/docs`

---

## 💡 Tips

1. **Upload files first** before asking questions
2. **Use specific questions** for better answers
3. **Multiple files?** They're all searched together
4. **Wrong answer?** Try rephrasing your question
5. **Toggle theme** with the button in top-right corner

---

## 🤝 Need Help?

1. Check the troubleshooting section above
2. Review browser console for errors (F12)
3. Check backend terminal for error logs
4. Verify all dependencies are installed

---

**Built with ❤️ using React, FastAPI, and Offline AI**

Enjoy using CortexDoc! 🎉
