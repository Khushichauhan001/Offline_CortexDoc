"""
Image loader with OCR support
Extracts text from images using pytesseract
"""
try:
    from PIL import Image
    import pytesseract
    HAS_OCR = True
except ImportError:
    HAS_OCR = False
    print("Warning: pytesseract or PIL not installed. Image OCR will not work.")
    print("Install with: pip install pytesseract pillow")


def load_image(file_path: str) -> str:
    """
    Extract text from image using OCR
    
    Args:
        file_path: Path to image file (jpg, png, etc.)
    
    Returns:
        Extracted text from image
    """
    if not HAS_OCR:
        return "Error: OCR dependencies not installed. Please install pytesseract and pillow."
    
    try:
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"Error while reading image: {e}")
        return f"Error extracting text from image: {str(e)}"
