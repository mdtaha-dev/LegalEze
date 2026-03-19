from flask import jsonify
from werkzeug.exceptions import HTTPException

def register_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"error": str(e.description) if hasattr(e, 'description') else "Bad request"}), 400

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Document not found"}), 404

    @app.errorhandler(413)
    def request_entity_too_large(e):
        return jsonify({"error": "File too large. maximum size is 20MB"}), 413

    @app.errorhandler(Exception)
    def handle_exception(e):
        # Log the error internally
        app.logger.error(f"Unhandled Exception: {str(e)}")
        
        # If it's an HTTP exception, return its status and message
        if isinstance(e, HTTPException):
            return jsonify({"error": str(e.description)}), e.code
            
        # For general exceptions, return 500
        return jsonify({"error": "An internal server error occurred"}), 500
