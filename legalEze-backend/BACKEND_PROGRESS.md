# LegalEze — Backend Progress Checklist

> Auto-generated audit of the Spring Boot backend as of 2026-03-13.
> Only backend code was analyzed; the `legalEze-frontend/` directory was **not** inspected.

---

## Completed

### Project Setup
- [x] Spring Boot initialization (`LegalEzeApplication.java`, Spring Boot 3.5.10)
- [x] Maven configuration (`pom.xml` with all required dependencies)
- [x] Java 21 setup (`java.version` property set to 21)

### Configuration
- [x] Application configuration (`application.properties` fully configured)
- [x] Environment variable support (datasource, API key, Redis via `${…}` placeholders)
- [x] Gemini API configuration (`spring.ai.google.genai` chat + embedding model, API key)
- [x] pgvector configuration (schema init, HNSW index, cosine distance, 768 dimensions)
- [x] Redis configuration (`spring.data.redis.host` / `port`)
- [x] JPA auditing configuration (`JpaConfig.java` with `@EnableJpaAuditing`)
- [x] Multipart upload limits configured (10 MB max file / request size)
- [x] Actuator health & info endpoints exposed

### Database Layer
- [x] PostgreSQL connection configured (JDBC driver + datasource properties)
- [x] pgvector extension integration (via `spring-ai-starter-vector-store-pgvector` dependency)
- [x] Base entity with UUID primary key, created/updated timestamps (`BaseEntity.java`)
- [x] Document entity (`Document.java` — fileName, contentType, fileSize, filePath, status)
- [x] Document status enum (`Status.java` — UPLOADED, PROCESSING, READY, FAILED)
- [x] Document repository interface (`DocumentRepository.java` extends `JpaRepository`)

### DTOs / Response Wrappers
- [x] Generic API response wrapper (`ApiResponse.java` — success, message, data, timestamp)
- [x] Document upload response DTO (`DocumentUploadResponseDto.java`)

### Infrastructure
- [x] Dockerfile (multi-stage build, JDK 21 Alpine, non-root user)
- [x] Docker Compose for PostgreSQL + pgvector (`pgvector/pgvector:pg17`)
- [x] Docker Compose includes Adminer (DB admin UI on port 8888)
- [x] Docker Compose includes Redis (`redis:alpine` on port 6379)
- [x] Docker Compose includes LegalEze app service with health-check dependency
- [x] Environment configuration (`.env` file with secrets)

### Document Ingestion
- [x] File storage service interface defined (`FileStorageService.java`)
- [x] File storage service implementation (`FileStorageServiceImpl.java` — local disk, UUID-prefixed filenames)
- [x] Document parser (`DocumentParserService.java` — Spring AI PDF reader, one document per page)
- [x] Text chunking logic (`TextChunkingService.java` — token-based, 800 tokens, 200 overlap)
- [x] Ingestion pipeline (`DocumentIngestionService.java` — upload → parse → chunk → embed → store)
- [x] Custom exception (`DocumentProcessingException.java`)

### Embedding Generation
- [x] Embedding handled automatically by `VectorStore.add()` via Gemini `text-embedding-004`
- [x] Embeddings stored in pgvector via `VectorStore`

### Database Layer
- [x] VectorStore bean explicitly wired (`VectorStoreConfig.java` — PgVectorStore with HNSW / cosine / 768 dims)

### Documentation
- [x] Project-level README with architecture overview, tech stack & getting started guide

---

## In Progress

_No items currently in progress._

---

## TODO



### RAG Query Pipeline
- [ ] Query embedding generation (embed user question for similarity search)
- [ ] Vector similarity search (retrieve top-K relevant chunks from pgvector)
- [ ] Retrieval of relevant document chunks (assemble search results)
- [ ] Context assembly for LLM (format retrieved chunks into a prompt)
- [ ] Response generation service (call Gemini chat model with context, return answer)

### REST API Layer
- [ ] Controller for document ingestion (upload endpoint)
- [ ] Controller for query submission (chat / ask endpoint)
- [ ] Health check endpoint (Spring Actuator is configured but a custom `/health` controller is absent)
- [ ] Global exception handler (`@ControllerAdvice` with structured error responses)

### Infrastructure
- [ ] `.env.example` template (for onboarding new developers without exposing secrets)

### Documentation
- [ ] Backend-specific README with API usage instructions
- [ ] API documentation (OpenAPI / Swagger integration)

### Testing
- [ ] Unit tests for services (ingestion, embedding, query pipeline)
- [ ] Integration tests for REST controllers
- [ ] Repository layer tests
