
from app.utils.text_splitter import chunk_text
from app.embeddings.embedder import get_embeddings
from app.vectorstore.faiss_store import add_vectors, search
from app.llm.ollama_client import generate_answer
import re 

def process_text(text: str):
   
    chunks = chunk_text(text)

    print("Total chunks:", len(chunks))
    vectors = get_embeddings(chunks)

    print("Embeddings generated")
    add_vectors(vectors, chunks)

    return chunks



def clean_answer(ans):
    ans = ans.strip()

    # remove garbage / long outputs
    if not ans or len(ans.split()) > 80:
        return "Not found in document"

    # handle model hallucination
    if "not found" in ans.lower():
        return "Not found in document"

    return ans

def query_text(query: str):
    from app.embeddings.embedder import get_embedding
    from app.vectorstore.faiss_store import search

    # Step 1: query embedding
    query_vector = get_embedding(query)

    # Step 2: search
    results = search(query_vector, query)

    if not results:
        return {
            "answer": "Not found in document",
            "chunks": []
        }

    # ✅ IMPORTANT FIX: only top 2 chunks
    best_chunks = results[:2]

    print("Retrieved Chunks:", best_chunks)

    # Step 3: clean context
    context = "\n\n".join(best_chunks)

    # Step 4: LLM call
    try:
        raw_answer = generate_answer(context, query)
        print("LLM RAW:", raw_answer)

        final_answer = clean_answer(raw_answer)

    except Exception as e:
        print("ERROR:", e)
        final_answer = "Answer not available"

    return {
        "answer": final_answer,
        "chunks": best_chunks
    }








    # multiple files cannot be uploaded and also it donot give the correct response ,ans is also not structed , and donot right , also if it donot know any ans then also it give , if ques is out of  pdf provided and simply say sorry i donot know the exavt ans 
    # ./start_server.sh