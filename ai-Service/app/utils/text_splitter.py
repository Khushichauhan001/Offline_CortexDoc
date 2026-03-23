def clean_text(text: str):
    text = text.replace("\n", " ")
    text = text.replace("\t", " ")
    text = " ".join(text.split())
    return text


def chunk_text(text: str):
    text = clean_text(text)

    # split by paragraph (better than fixed size)
    paragraphs = text.split("  ")

    chunks = []
    current_chunk = ""

    for para in paragraphs:
        para = para.strip()

        if not para:
            continue

        #  if chunk small → merge
        if len(current_chunk) + len(para) < 1000:
            current_chunk += " " + para
        else:
            chunks.append(current_chunk.strip())
            current_chunk = para

    # last chunk
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks