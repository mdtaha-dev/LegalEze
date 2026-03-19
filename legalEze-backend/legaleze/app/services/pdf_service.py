import fitz # PyMuPDF

class PDFService:
    @staticmethod
    def extract_text(file_path: str) -> str:
        """
        Extracts raw text from a PDF file using PyMuPDF.
        """
        text = ""
        try:
            with fitz.open(file_path) as doc:
                for page in doc:
                    text += page.get_text()
            return text.strip()
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
