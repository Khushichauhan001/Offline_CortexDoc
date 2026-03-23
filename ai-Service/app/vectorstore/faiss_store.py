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

    # SAFETY: agar index empty hai
    if index.ntotal == 0:
        return []

    query_vector = np.array([query_vector]).astype('float32')

    distances, indices = index.search(query_vector, k)

    results = []

    #  better keyword matching
    query_words = [w.strip(".,!?") for w in query_text.lower().split()]

    for idx, i in enumerate(indices[0]):

        #  safety check
        if i < len(documents):

            chunk = documents[i]

            #  keyword score improve
            chunk_words = chunk.lower()

            keyword_score = sum(
                1 for word in query_words if word in chunk_words
            )

            #  vector score
            vector_score = 1 / (1 + distances[0][idx])

            # weighted score (important)
            final_score = (2 * keyword_score) + vector_score

            results.append((chunk, final_score))

    #  sort
    results.sort(key=lambda x: x[1], reverse=True)

    #  return only chunks
    return [r[0] for r in results]