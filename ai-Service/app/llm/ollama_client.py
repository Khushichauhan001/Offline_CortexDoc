import requests

def generate_answer(context, query):
    url = "http://localhost:11434/api/generate"

    prompt = f"""
You are a strict QA system.

Rules:
- Answer ONLY from the context.
- Answer in 1-2 lines.
- Do NOT explain.
- Do NOT add extra text.
- If answer not present → say EXACTLY: Not found in document.

Context:
{context}

Question:
{query}

Answer:
"""

    response = requests.post(
        url,
        json={
            "model": "phi3",
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )

    data = response.json()

    return data.get("response", "").strip()



