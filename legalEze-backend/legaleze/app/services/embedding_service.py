import requests
from flask import current_app

class EmbeddingService:
    @staticmethod
    def generate_embedding(text: str) -> list[float]:
        """
        Calls local Ollama API to generate embeddings for the given text.
        """
        base_url = current_app.config['OLLAMA_BASE_URL']
        model = current_app.config['OLLAMA_MODEL']
        
        try:
            response = requests.post(
                f"{base_url}/api/embeddings",
                json={
                    "model": model,
                    "prompt": text
                },
                timeout=30 # Add a timeout for safety
            )
            response.raise_for_status()
            return response.json()["embedding"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"Ollama API unreachable or error: {str(e)}")
        except KeyError:
            raise Exception("Invalid response format from Ollama API")
