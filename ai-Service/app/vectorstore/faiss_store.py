import faiss
import numpy as np

# global variables (simple approach for now)
dimension = 384  # MiniLM embedding size
index = faiss.IndexFlatL2(dimension)

documents = []  # text chunks store karne ke liye


def add_vectors(vectors, chunks):
    """
    vectors FAISS me add karega
    chunks ko memory me store karega
    """
    global documents

    vectors = np.array(vectors).astype('float32')

    index.add(vectors)
    documents.extend(chunks)


def search(query_vector, k=5):
    query_vector = np.array([query_vector]).astype('float32')

    distances, indices = index.search(query_vector, k)

    results = []
    for i in indices[0]:
        if i < len(documents):
            text = documents[i]

            #  filter short garbage
            if len(text) > 50:
                results.append(text)

    return results