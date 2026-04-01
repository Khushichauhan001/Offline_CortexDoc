#  Offline CortexDoc AI

 A privacy-focused offline RAG Based system to chat with your documents using local LLMs — featuring a **one-click setup** for seamless execution.

---

## ⚡ One-Click Setup (Highlight Feature)

> 💡 No manual setup. No complex installation. Just one command and you're ready!

###  Linux /  Mac

```bash
./start.sh
```

###  Windows

```bash
start.bat
```

### 🔥 What this script does automatically:

*  Installs Ollama (if not installed)
*  Downloads the LLM model (phi3)
*  Sets up Python virtual environment
*  Installs backend dependencies
*  Starts FastAPI backend server
*  Installs frontend dependencies
*  Launches React application

👉  **Everything runs automatically — no manual configuration needed**

---



## ✨ Features

* 📄 Chat with PDF, DOCX, TXT documents
* ⚡ Fully offline after setup
* 🔍 Source-based answers with document references
* 🧠 Local LLM (Ollama - phi3)
* ⚡ Fast retrieval using FAISS
* 🎯 Clean and responsive UI
* 🚀 One-click full system startup
* 🔒 Privacy-first (no data leaves your machine)

---

##  Tech Stack

* **Frontend:** React + Vite
* **Backend:** FastAPI
* **Vector DB:** FAISS
* **Embeddings:** Sentence Transformers
* **LLM:** Ollama (phi3)

---

## ⚙️ How It Works

1. Upload your document
2. Text is chunked
3. Embeddings are generated
4. Stored in FAISS
5. Query retrieves relevant chunks
6. LLM generates answer

---

##  Important Notes

* 🌐 Internet required only for **first-time setup (model download)**
* ⚡ After setup, app works **completely offline**
* 🧠 Model size ~4GB

---

## 📂 Project Structure

```
Offline_CortexDoc/
│
├── ai-Service/        # Backend (FastAPI)
├── client/            # Frontend (React)
├── start.sh           # One-click setup (Linux/Mac)
├── start.bat          # One-click setup (Windows)
└── README.md
```

---



## Author

**Khushi Chauhan**
Aspiring Software Developer | AI + Full Stack Enthusiast

---

## ⭐ Support

If you found this useful, consider giving it a ⭐ on GitHub!
