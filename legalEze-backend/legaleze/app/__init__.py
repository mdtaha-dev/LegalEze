import os
from flask import Flask
from flasgger import Swagger
from app.config import Config
from app.models.document import db
from app.errors.handlers import register_error_handlers
from app.routes.documents import documents_bp
from extensions import cache, limiter

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize Extensions
    db.init_app(app)
    cache.init_app(app)
    limiter.init_app(app)
    Swagger(app)
    
    # Register Blueprints
    app.register_blueprint(documents_bp, url_prefix='/api/documents')
    
    # Register Error Handlers
    register_error_handlers(app)
    
    return app
