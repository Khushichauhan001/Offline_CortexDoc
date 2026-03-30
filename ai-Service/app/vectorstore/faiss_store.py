import faiss
import numpy as np

dimension = 384
index = faiss.IndexFlatL2(dimension)

documents = []


def add_vectors(vectors, chunks):
    global documents

    vectors = np.array(vectors).astype('float32')

    index.add(vectors)
    documents.extend(chunks)


def search(query_vector, query_text, k=5):
    import numpy as np

    if index.ntotal == 0:
        return []

    query_vector = np.array([query_vector]).astype('float32')

    distances, indices = index.search(query_vector, k)

    results = []

    query_words = [w.strip(".,!?") for w in query_text.lower().split()]

    for idx, i in enumerate(indices[0]):

        if i < len(documents):

            chunk = documents[i]
            chunk_lower = chunk.lower()

            keyword_score = sum(
                1 for word in query_words if word in chunk_lower
            )

            # skip irrelevant chunks
            if keyword_score == 0:
                continue
            vector_score = 1 / (1 + distances[0][idx])

            final_score = (3 * keyword_score) + (2 * vector_score)

            results.append((chunk, final_score))

    results.sort(key=lambda x: x[1], reverse=True)

    return [r[0] for r in results]