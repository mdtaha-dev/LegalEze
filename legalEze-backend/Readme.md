# LegalEze

LegalEze is a Retrieval-Augmented Generation (RAG) based legal assistant built with Spring Boot. It improves response accuracy by grounding AI-generated answers in verified legal documents using vector similarity search.

---

## Overview

LegalEze combines semantic search with large language models to deliver context-aware and fact-grounded legal responses. Instead of relying purely on generative output, the system retrieves relevant document fragments and uses them as context for response generation.

This architecture reduces hallucination risk and improves factual reliability.

---

## Architecture

The system follows a Retrieval-Augmented Generation pipeline:

### 1. Document Ingestion

Legal documents are parsed and divided into semantically meaningful chunks.

### 2. Embedding Generation

Each chunk is converted into a vector embedding using the Gemini Embeddings API.

### 3. Vector Storage

Embeddings are stored in PostgreSQL using the `pgvector` extension for efficient similarity search.

### 4. Query Processing

When a user submits a query:

- The query is converted into an embedding.
- The system performs vector similarity search.
- The most relevant document chunks are retrieved.
- The language model generates a grounded response using retrieved context.

---

## Tech Stack

- Java 21
- Spring Boot
- PostgreSQL
- pgvector
- Docker & Docker Compose
- Gemini Embeddings API

---

## Project Structure

```
src/main/java
├── config        # Application configuration
├── ingestion     # Document parsing and chunking logic
├── embedding     # Embedding generation logic
├── repository    # Vector storage & database access
├── service       # Core RAG orchestration logic
└── controller    # REST API layer
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/legaleze.git
cd legaleze
```

### 2. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Add your Gemini API key inside the `.env` file.

### 3. Start the Database

```bash
docker-compose up -d
```

This will start PostgreSQL with the `pgvector` extension enabled.

### 4. Run the Application

```bash
./mvnw spring-boot:run
```

The application will start on the configured port.

---

## API

The application exposes REST endpoints for:

- Document ingestion
- Query submission
- Health checks

OpenAPI documentation can be enabled if configured.

---

## Non-Functional Considerations

- Efficient vector similarity indexing
- Stateless application design for horizontal scaling
- Environment-based configuration
- Dockerized local development
- Clear separation of ingestion and query pipelines

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Submit a Pull Request

Please review open issues before starting major work.

---

## License

Distributed under the MIT License. See the `LICENSE` file for details.

---

## Author

Abhijeet Singh  
Built for FOSS Hack 2026
