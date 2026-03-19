import uuid
from datetime import datetime
from pgvector.sqlalchemy import Vector
from sqlalchemy.dialects.postgresql import UUID, JSON
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Document(db.Model):
    __tablename__ = 'documents'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(512), nullable=False)
    extracted_text = db.Column(db.Text, nullable=True)
    # 768-dimensional vector embedding
    embedding = db.Column(Vector(768), nullable=True)
    # AI-powered legal analysis (JSON)
    analysis = db.Column(JSON, nullable=True)
    status = db.Column(db.String(50), default='PENDING')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': str(self.id),
            'filename': self.filename,
            'file_path': self.file_path,
            'status': self.status,
            'analysis': self.analysis,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
