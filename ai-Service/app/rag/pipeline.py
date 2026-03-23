
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


def query_text(query: str):
    from app.embeddings.embedder import get_embedding
    from app.vectorstore.faiss_store import search
    import re

    
    query_vector = get_embedding(query)
    results = search(query_vector, query)
     
    
    best_chunks = results[:3]
    best_answer = ""


# “I improved retrieval quality by aggregating relevant sentences from multiple top-ranked chunks instead of relying on a single chunk.”

    for chunk in best_chunks:
        sentences = re.split(r'(?<=[.!?]) +', chunk)

        # selected_sentences = []

        all_selected_sentences = []

        for chunk in best_chunks:
            sentences = re.split(r'(?<=[.!?]) +', chunk)
        
            for sentence in sentences:
                query_words = set(query.lower().split())
                sentence_words = set(sentence.lower().split())

                #  at least 2 words match hone chahiye
                if len(query_words & sentence_words) >=1:
    
                 #  chhote garbage sentences skip karo
                    if len(sentence) > 300:
                        continue

                    all_selected_sentences.append(sentence.strip())
        
        #  duplicate remove
        unique_sentences = list(dict.fromkeys(all_selected_sentences))
        
        #  top 5 sentences combine
        # best_answer = " ".join(unique_sentences[:5])
         #  structured answer
        formatted_answer = ""
        
        for i, sentence in enumerate(unique_sentences[:5], start=1):
            formatted_answer += f"{i}. {sentence.strip()} "
        
        best_answer = formatted_answer.strip()

        best_answer = best_answer.replace("  ", " ")

        if best_answer:
            best_answer = best_answer[0].upper() + best_answer[1:]
    # fallback
    if not best_answer and best_chunks:
        sentences = re.split(r'(?<=[.!?]) +', best_chunks[0])
        best_answer = " ".join(sentences[:2])

    # return {
    #     "answer": best_answer,
    #     "chunks": best_chunks
    # }

    context = " ".join(best_chunks)

    try:
        final_answer = generate_answer(context, query)
    except:
        final_answer = best_answer  # fallback
    
    return {
        "answer": final_answer,
        "chunks": best_chunks
    }