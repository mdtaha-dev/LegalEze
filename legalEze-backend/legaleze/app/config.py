import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-123')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Storage
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', './uploads')
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 20 * 1024 * 1024)) # 20MB
    
    # Redis for Caching and Limiter
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_URL = REDIS_URL
    CACHE_DEFAULT_TIMEOUT = 600 # 10 minutes
    
    # Rate Limiting
    RATELIMIT_STORAGE_URI = REDIS_URL
    
    # Ollama
    OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
    OLLAMA_MODEL = os.getenv('OLLAMA_MODEL', 'nomic-embed-text')
    
    # Swagger
    SWAGGER = {
        'title': 'LegalEze API',
        'uiversion': 3,
        'description': 'AI-powered Legal Document Management System'
    }
