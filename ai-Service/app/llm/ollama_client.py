import requests

def generate_answer(context, query):
    url = "http://localhost:11434/api/generate"

    prompt = f"""
You are a strict RAG-based QA system.

Rules:
- Answer strictly ONLY using the provided context.
- If answer not found, say EXACTLY: Not found in document.
- Explain in simple and clear terms.
- Keep answer concise but meaningful.
- Do not use outside knowledge.
- Use bullet points if needed.
- Include a simple example if possible.
-  Do NOT include phrases like "Context", "Follow up", "Explanation".

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