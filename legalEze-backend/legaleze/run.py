from app import create_app
from app.models.document import db

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Create database tables automatically
        db.create_all()
        # Initialize pgvector extension if not exists
        db.session.execute(db.text('CREATE EXTENSION IF NOT EXISTS vector'))
        db.session.commit()
    
    app.run(host='0.0.0.0', port=5000, debug=True)
