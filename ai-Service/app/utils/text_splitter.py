def clean_text(text: str):
    # newline remove
    text = text.replace("\n", " ")
    
    # tabs remove
    text = text.replace("\t", " ")

    # extra spaces remove
    text = " ".join(text.split())

    return text


def chunk_text(text: str, chunk_size=200, overlap=50):
    
    #  CLEAN FIRST (MOST IMPORTANT LINE)
    text = clean_text(text)

    chunks = []
    start = 0

    text_length = len(text)

    while start < text_length:
        end = start + chunk_size
        chunk = text[start:end]

        chunks.append(chunk)

        start += chunk_size - overlap

    return chunks