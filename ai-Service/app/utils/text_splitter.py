def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50):
    """
    text ko small chunks me todta hai
    
    chunk_size = har chunk ka size
    overlap = thoda text repeat hoga next chunk me (context ke liye)
    """
    
    chunks = []
    start = 0
    text_length = len(text)
    
    while start < text_length:
        end = start + chunk_size
        
        chunk = text[start:end]
        chunks.append(chunk)
        
        # next chunk ke liye start move karenge (overlap ke saath)
        start += chunk_size - overlap
    
    return chunks