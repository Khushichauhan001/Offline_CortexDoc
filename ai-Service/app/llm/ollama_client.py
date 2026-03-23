import requests

def generate_answer(context, query):
    url = "http://localhost:11434/api/generate"

    prompt = f"""
You are a helpful AI assistant.

Strictly answer from the given context.
Do not add extra information.
If answer is not present, say "Not found in document".

Context:
{context}

Question:
{query}

Answer:
"""

    response = requests.post(url, json={
        "model": "phi3",   #  yaha phi3 use ho raha
        "prompt": prompt,
        "stream": False
    },
    timeout=60 
    )

    data = response.json()

    return data["response"]