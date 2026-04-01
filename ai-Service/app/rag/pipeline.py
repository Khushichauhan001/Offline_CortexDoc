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
            "sources": []
        }

    # Step 3: take top chunks
    best_chunks = results[:3]
    print("Retrieved Chunks:", best_chunks)

    # Step 4: build context
    context = "\n\n".join(best_chunks)

    # Step 5: LLM call
    try:
        raw_answer = generate_answer(context, query)
        print("LLM RAW:", raw_answer)

        final_answer = clean_answer(raw_answer)

    except Exception as e:
        print("ERROR:", e)
        final_answer = "Answer not available"

    # Step 6: return with sources
    return {
    "answer": final_answer,
    "sources": [
        {
            "text": r,
            "file": "Unknown",
            "page": "N/A"
        }
        for r in best_chunks
    ]
}