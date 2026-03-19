import uuid
from flask import Blueprint, request, jsonify, current_app
from flasgger import swag_from
from app.models.document import Document
from app.repositories.document_repository import DocumentRepository
from app.services.storage_service import StorageService
from app.services.pdf_service import PDFService
from app.services.embedding_service import EmbeddingService
from app.services.analysis_service import AnalysisService
from extensions import cache, limiter

documents_bp = Blueprint('documents', __name__)

@documents_bp.route('/upload', methods=['POST'])
@limiter.limit("5 per minute")
@swag_from({
    'tags': ['Documents'],
    'parameters': [
        {
            'name': 'file',
            'in': 'formData',
            'type': 'file',
            'required': True,
            'description': 'PDF file to upload'
        }
    ],
    'responses': {
        '201': {'description': 'Document uploaded, embedded, and analyzed successfully'},
        '400': {'description': 'Invalid file type or missing file'},
        '413': {'description': 'File too large'},
        '500': {'description': 'Processing failure'}
    }
})
def upload_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    try:
        # 1. Save file
        file_path = StorageService.save_file(file)
        
        # 2. Extract text
        extracted_text = PDFService.extract_text(file_path)
        
        # 3. Generate embedding
        embedding = EmbeddingService.generate_embedding(extracted_text)
        
        # 4. Generate Analysis (New feature)
        analysis = None
        try:
            analysis = AnalysisService.analyze_legal_document(extracted_text)
        except Exception as e:
            current_app.logger.warning(f"Initial analysis failed: {str(e)}")
        
        # 5. Save to DB
        doc = Document(
            filename=file.filename,
            file_path=file_path,
            extracted_text=extracted_text,
            embedding=embedding,
            analysis=analysis,
            status='PROCESSED'
        )
        DocumentRepository.save(doc)
        
        return jsonify(doc.to_dict()), 201
        
    except Exception as e:
        current_app.logger.error(f"Upload failed: {str(e)}")
        return jsonify({"error": f"Failed to process document: {str(e)}"}), 500

@documents_bp.route('', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'responses': {
        '200': {'description': 'List of all documents'}
    }
})
def get_documents():
    docs = DocumentRepository.get_all()
    return jsonify([doc.to_dict() for doc in docs]), 200

@documents_bp.route('/<uuid:doc_id>', methods=['GET'])
@cache.cached(timeout=600)
@swag_from({
    'tags': ['Documents'],
    'parameters': [{'name': 'doc_id', 'in': 'path', 'type': 'string', 'required': True}],
    'responses': {
        '200': {'description': 'Document details'},
        '404': {'description': 'Document not found'}
    }
})
def get_document(doc_id):
    doc = DocumentRepository.get_by_id(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    return jsonify(doc.to_dict()), 200

@documents_bp.route('/<uuid:doc_id>', methods=['DELETE'])
@swag_from({
    'tags': ['Documents'],
    'parameters': [{'name': 'doc_id', 'in': 'path', 'type': 'string', 'required': True}],
    'responses': {
        '204': {'description': 'Document deleted'},
        '404': {'description': 'Document not found'}
    }
})
def delete_document(doc_id):
    doc = DocumentRepository.get_by_id(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
        
    StorageService.delete_file(doc.file_path)
    DocumentRepository.delete(doc_id)
    cache.delete(f'view/{request.path}')
    
    return '', 204

@documents_bp.route('/search', methods=['POST'])
@swag_from({
    'tags': ['Documents'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'query': {'type': 'string'}
                },
                'required': ['query']
            }
        }
    ],
    'responses': {
        '200': {'description': 'Search results'},
        '400': {'description': 'Missing query'}
    }
})
def search_documents():
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Missing query"}), 400
    
    query_text = data['query']
    
    try:
        query_embedding = EmbeddingService.generate_embedding(query_text)
        results = DocumentRepository.semantic_search(query_embedding)
        return jsonify([doc.to_dict() for doc in results]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@documents_bp.route('/<uuid:doc_id>/analyze', methods=['POST'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Trigger manual AI analysis',
    'parameters': [{'name': 'doc_id', 'in': 'path', 'type': 'string', 'required': True}],
    'responses': {
        '200': {'description': 'Analysis complete'},
        '404': {'description': 'Document not found'},
        '503': {'description': 'AI service unavailable'}
    }
})
def analyze_document(doc_id):
    doc = DocumentRepository.get_by_id(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    
    if not doc.extracted_text:
        return jsonify({"error": "No text extracted for document"}), 400
        
    try:
        analysis = AnalysisService.analyze_legal_document(doc.extracted_text)
        doc.analysis = analysis
        DocumentRepository.save(doc)
        return jsonify(analysis), 200
    except Exception as e:
        if "AI service unavailable" in str(e):
            return jsonify({"error": "AI service unavailable"}), 503
        return jsonify({"error": str(e)}), 500

@documents_bp.route('/<uuid:doc_id>/analysis', methods=['GET'])
@swag_from({
    'tags': ['Documents'],
    'summary': 'Get stored analysis result',
    'parameters': [{'name': 'doc_id', 'in': 'path', 'type': 'string', 'required': True}],
    'responses': {
        '200': {'description': 'Stored analysis object'},
        '404': {'description': 'Document or analysis not found'}
    }
})
def get_analysis(doc_id):
    doc = DocumentRepository.get_by_id(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    
    if not doc.analysis:
        return jsonify({"error": "Analysis not found for this document"}), 404
        
    return jsonify(doc.analysis), 200
