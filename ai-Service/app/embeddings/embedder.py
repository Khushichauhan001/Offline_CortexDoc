from sentence_transformers import SentenceTransformer

# model load (sirf ek baar load hoga)
model = SentenceTransformer('all-MiniLM-L6-v2')


def get_embedding(text: str):
    """
    ek text ko vector me convert karega
    """
    return model.encode(text)


def get_embeddings(texts: list):
    """
    multiple texts (chunks) ko vectors me convert karega
    """
    return model.encode(texts)