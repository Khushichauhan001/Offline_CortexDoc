# CortexDoc – Offline AI Document Q&A System

CortexDoc is an **offline AI-powered document question-answering system** that allows users to upload files (PDF, TXT, DOCX, Images) and ask questions based strictly on the document content.

It uses a **Retrieval-Augmented Generation (RAG)** pipeline with local embeddings and LLMs to ensure **privacy, speed, and zero API cost**.

---

##  Features

* 📄 Upload multiple documents (PDF, TXT, DOCX, Images)
* 🔍 Ask questions based on document content
* 🧠 Uses **local embeddings + FAISS vector database**
* 🤖 Runs with **offline LLM (Ollama)**
* 📌 Source highlighting (file + page number)
* ⚡ Fast retrieval with semantic search
* 🔒 Fully offline & secure (no external API)
* 🎨 Modern React UI with chat interface

---

##  Tech Stack

### 🔹 Backend

* FastAPI
* FAISS (Vector Database)
* Sentence Transformers (Embeddings)
* Ollama (LLM - local)
* PyPDF2 / OCR (for document parsing)

### 🔹 Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios

---

## How It Works (RAG Pipeline)

1. **Upload Document**

   * File is parsed (PDF/DOCX/TXT/Image)

2. **Text Chunking**

   * Document is split into smaller chunks

3. **Embeddings**

   * Each chunk is converted into vector representation

4. **Vector Storage**

   * Stored in FAISS database

5. **User Query**

   * Query is converted into embedding

6. **Similarity Search**

   * Top relevant chunks are retrieved

7. **LLM Generation**

   * Answer generated strictly from retrieved context

---

## 📂 Project Structure

```
Offline_CortexDoc/
│
├── ai-Service/              # Backend (FastAPI)
│   ├── app/
│   │   ├── loaders/         # File loaders
│   │   ├── embeddings/      # Embedding logic
│   │   ├── vectorstore/     # FAISS logic
│   │   ├── rag/             # RAG pipeline
│   │   └── main.py          # API entry point
│
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/cortexdoc.git
cd cortexdoc
```

---

### 🔹 2. Backend Setup

```bash
cd ai-Service

python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

pip install -r requirements.txt
```

---

### 🔹 3. Install Ollama (Local LLM)

```bash
ollama pull phi3
```

---

### 🔹 4. Run Backend

```bash
uvicorn app.main:app --reload
```

---

### 🔹 5. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Usage

1. Open: `http://localhost:3000`
2. Upload a document
3. Ask questions like:

   * *"What is SQL?"*
   * *"Explain frameworks in Java"*
4. Get answers with **source references**

---

## 💡 Key Highlights

* Works **completely offline**
* No API cost
* Privacy-focused
* Real-world RAG implementation
* Production-ready architecture

---

## 👨‍💻 Author

**Khushi Chauhan**
 Software Developer

---

## ⭐ Contribute

Pull requests are welcome!
Feel free to fork and improve the project.

