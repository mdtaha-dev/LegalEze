import uuid
from typing import List, Optional
from sqlalchemy import select, delete
from app.models.document import db, Document

class DocumentRepository:
    @staticmethod
    def save(document: Document) -> Document:
        """Saves a document to the database."""
        db.session.add(document)
        db.session.commit()
        return document

    @staticmethod
    def get_all() -> List[Document]:
        """Returns all documents."""
        return Document.query.order_by(Document.created_at.desc()).all()

    @staticmethod
    def get_by_id(doc_id: uuid.UUID) -> Optional[Document]:
        """Returns a document by its ID."""
        return Document.query.get(doc_id)

    @staticmethod
    def delete(doc_id: uuid.UUID) -> bool:
        """Deletes a document by its ID."""
        doc = Document.query.get(doc_id)
        if doc:
            db.session.delete(doc)
            db.session.commit()
            return True
        return False

    @staticmethod
    def semantic_search(query_embedding: list[float], limit: int = 5) -> List[Document]:
        """
        Performs a cosine similarity search using pgvector.
        Returns top-N most relevant documents.
        """
        # cosine_distance is 1 - cosine_similarity
        # We want to minimize distance
        return Document.query.order_by(
            Document.embedding.cosine_distance(query_embedding)
        ).limit(limit).all()
