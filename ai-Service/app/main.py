from fastapi import FastAPI, UploadFile, File
import shutil
import os

from app.loaders.pdf_loader import load_pdf
from app.utils.text_splitter import chunk_text
# from app.rag.pipeline import process_text
from app.rag.pipeline import process_text, query_text


def process_text(text: str):
    chunks = chunk_text(text)
    
    print("Total chunks:", len(chunks))
    
    return chunks

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

from app.rag.pipeline import process_text


# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
    
#     file_path = f"uploads/{file.filename}"
    
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
    
#     # PDF read
#     text = load_pdf(file_path)
    
#     # CHUNK + EMBEDDING 🔥
#     chunks, vectors = process_text(text)
    
#     return {
#         "filename": file.filename,
#         "total_chunks": len(chunks),
#         "vector_length": len(vectors),
#         "sample_vector": vectors[0].tolist()[:5] if len(vectors) > 0 else []
#     }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    
    file_path = f"uploads/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    text = load_pdf(file_path)

    # store in FAISS
    chunks = process_text(text)
    
    return {
        "message": "Document processed and stored in FAISS",
        "total_chunks": len(chunks)
    }



@app.get("/query")
def query_api(q: str):
    
    result = query_text(q)
    
    return {
        "query": q,
        "answer": result["answer"],
        "context": result["chunks"]
    }