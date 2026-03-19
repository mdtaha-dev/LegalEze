# LegalEze Backend (Flask)

AI-powered Legal Document Management System with Semantic Search.

## Getting Started

### 1. Setup Environment
```powershell
cd legaleze
python -m venv venv
.\venv\Scripts\activate
python -m pip install -r requirements.txt
```

### 2. Configuration
Update the `.env` file with your local credentials:
- `DATABASE_URL`
- `REDIS_URL`
- `OLLAMA_BASE_URL`

### 3. Run
```powershell
python run.py
```

## API Documentation
Access Swagger UI at [http://localhost:5000/apidocs](http://localhost:5000/apidocs)
