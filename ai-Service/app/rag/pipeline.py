from app.utils.text_splitter import chunk_text
from app.embeddings.embedder import get_embeddings
from app.vectorstore.faiss_store import add_vectors, search


def process_text(text: str):
    # Step 1: chunking
    chunks = chunk_text(text)

    print("Total chunks:", len(chunks))

    # Step 2: embeddings
    vectors = get_embeddings(chunks)

    print("Embeddings generated")

    # Step 3: store in FAISS 🔥
    add_vectors(vectors, chunks)

    return chunks


def query_text(query: str):
    from app.embeddings.embedder import get_embedding

    query_vector = get_embedding(query)

    results = search(query_vector)

    return results