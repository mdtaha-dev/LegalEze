import os
from werkzeug.utils import secure_filename
from flask import current_app

class StorageService:
    @staticmethod
    def save_file(file) -> str:
        """
        Saves the uploaded file to the configured upload folder.
        Returns the absolute path to the saved file.
        """
        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        return os.path.abspath(file_path)

    @staticmethod
    def delete_file(file_path: str):
        """Deletes a file from disk if it exists."""
        if os.path.exists(file_path):
            os.remove(file_path)
