from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from typing import List

from app.loaders.pdf_loader import load_pdf
from app.loaders.txt_loader import load_txt
from app.loaders.docx_loader import load_docx
from app.loaders.image_loader import load_image
from app.utils.text_splitter import chunk_text
from app.rag.pipeline import process_text, query_text

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists
if not os.path.exists("uploads"):
    os.makedirs("uploads")


@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}


def load_document(file_path: str, file_extension: str) -> str:
    """
    Load document based on file type
    """
    if file_extension == '.pdf':
        return load_pdf(file_path)
    elif file_extension == '.txt':
        return load_txt(file_path)
    elif file_extension == '.docx':
        return load_docx(file_path)
    elif file_extension in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        return load_image(file_path)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file_extension}")


@app.post("/upload")
# async def upload_file(files: List[UploadFile] = File(...)):
async def upload_file(files: list[UploadFile] = File(...)):
    """
    Upload one or more documents (PDF, TXT, DOCX, Images)
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    total_chunks = 0
    processed_files = []
    
    for file in files:
        # Save file
        file_path = f"uploads/{file.filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Get file extension
        _, file_extension = os.path.splitext(file.filename.lower())
        
        try:
            # Load document based on type
            text = load_document(file_path, file_extension)
            
            if text.startswith("Error"):
                processed_files.append({
                    "filename": file.filename,
                    "status": "error",
                    "error": text
                })
                continue
            
            # Process and store in FAISS
            chunks = process_text(text)
            total_chunks += len(chunks)
            
            processed_files.append({
                "filename": file.filename,
                "status": "success",
                "chunks": len(chunks)
            })
        except Exception as e:
            processed_files.append({
                "filename": file.filename,
                "status": "error",
                "error": str(e)
            })
    
    return {
        "message": "Documents processed and stored in FAISS",
        "num_chunks": total_chunks,
        "files": processed_files
    }



@app.get("/query")
def query_api(q: str):
    
    result = query_text(q)
    
    return {
        "query": q,
        "answer": result["answer"],
        "context": result["chunks"]
    }