import requests
import json
from flask import current_app

class AnalysisService:
    @staticmethod
    def analyze_legal_document(text: str) -> dict:
        """
        Sends extracted text to Ollama (llama3) for structured legal analysis.
        """
        prompt = f"""
        You are an expert legal analyst. Analyze the following legal document and respond ONLY in valid JSON format with no extra text.

        Return exactly this structure:
        {{
          "document_type": "type of legal document",
          "summary": "2-3 sentence plain English summary",
          "key_parties": ["party1", "party2"],
          "governing_law": "applicable law/jurisdiction",
          "risk_score": <number from 1-10>,
          "risky_clauses": [
            "description of risky clause 1",
            "description of risky clause 2"
          ],
          "recommendations": [
            "recommendation 1",
            "recommendation 2"
          ],
          "key_dates": ["date1", "date2"],
          "obligations": [
            "key obligation 1",
            "key obligation 2"
          ]
        }}

        Legal Document:
        {text}
        """

        base_url = current_app.config.get('OLLAMA_BASE_URL', 'http://localhost:11434')
        
        try:
            response = requests.post(
                f"{base_url}/api/generate",
                json={
                    "model": "llama3",
                    "prompt": prompt,
                    "stream": False
                },
                timeout=300 # Analysis can take longer than embeddings
            )
            response.raise_for_status()
            
            result_text = response.json().get("response", "")
            
            try:
                # Clean up response if llama3 adds markdown blocks
                if '```json' in result_text:
                    result_text = result_text.split('```json')[1].split('```')[0].strip()
                elif '```' in result_text:
                    result_text = result_text.split('```')[1].strip()
                
                return json.loads(result_text)
            except json.JSONDecodeError:
                # Fallback as requested
                return {
                    "raw_response": result_text,
                    "warning": "Failed to parse structured JSON from AI response"
                }
                
        except requests.exceptions.RequestException as e:
            # Service unavailable (503) will be handled in routes
            raise Exception(f"AI service unavailable: {str(e)}")

