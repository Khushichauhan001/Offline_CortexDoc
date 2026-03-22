# from PyPDF2 import PdfReader


# def load_pdf(file_path: str) -> str:
#     # ye function PDF file ko read karega aur pura text return karega
    
#     text = ""
    
#     try:
#         reader = PdfReader(file_path)
        
#         # har page ka text extract karenge
#         for page in reader.pages:
#             page_text = page.extract_text()
            
#             if page_text:
#                 text += page_text + "\n"
    
#     except Exception as e:
#         print("Error while reading PDF:", e)
    
#     return text


import fitz  # PyMuPDF

def load_pdf(file_path: str):
    text = ""

    doc = fitz.open(file_path)

    for page in doc:
        text += page.get_text()

    return text