"""
Plain text file loader
"""

def load_txt(file_path: str) -> str:
    """
    Read plain text file
    
    Args:
        file_path: Path to .txt file
    
    Returns:
        File content as string
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
        return text.strip()
    except Exception as e:
        print(f"Error while reading text file: {e}")
        return f"Error reading text file: {str(e)}"
