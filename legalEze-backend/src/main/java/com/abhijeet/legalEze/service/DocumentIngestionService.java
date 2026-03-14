package com.abhijeet.legalEze.service;

import com.abhijeet.legalEze.dtos.DocumentUploadResponseDto;
import com.abhijeet.legalEze.exception.DocumentProcessingException;
import com.abhijeet.legalEze.model.Document;
import com.abhijeet.legalEze.model.Status;
import com.abhijeet.legalEze.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.util.List;

/**
 * Orchestrates the full document ingestion pipeline:
 * <b>upload → save to DB → parse → chunk → embed → store in vector DB</b>.
 *
 * <p>This is the single entry point for ingesting a new document.  It
 * coordinates all the individual services and manages the {@link Document}
 * entity's lifecycle status through each stage:</p>
 *
 * <pre>
 *   UPLOADED  →  PROCESSING  →  READY
 *                     │
 *                     └──► FAILED  (on any error)
 * </pre>
 *
 * <h3>Embedding happens automatically</h3>
 * <p>When we call {@link VectorStore#add(List)}, Spring AI automatically
 * invokes the configured {@link org.springframework.ai.embedding.EmbeddingModel}
 * (Gemini {@code text-embedding-004}) to generate vector embeddings for each
 * chunk before storing them in pgvector.  There is no need to call the
 * embedding model explicitly.</p>
 */
@Service
@Slf4j
@RequiredArgsConstructor
@ConditionalOnBean(DataSource.class)
public class DocumentIngestionService {

    private final FileStorageService fileStorageService;
    private final DocumentRepository documentRepository;
    private final DocumentParserService documentParserService;
    private final TextChunkingService textChunkingService;
    private final VectorStore vectorStore;

    /**
     * Ingests a PDF document through the full pipeline.
     *
     * @param file the uploaded PDF multipart file
     * @return response DTO with document ID, filename, status, and timestamp
     * @throws DocumentProcessingException if any stage of processing fails
     */
    public DocumentUploadResponseDto ingest(MultipartFile file) {
        log.info("Starting ingestion for file: {}", file.getOriginalFilename());

        // Step 1: Store the raw file on disk
        String filePath = fileStorageService.storeFile(file);

        // Step 2: Create a Document entity with UPLOADED status
        Document document = Document.builder()
                .fileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .filePath(filePath)
                .status(Status.UPLOADED)
                .build();
        document = documentRepository.save(document);
        log.info("Document saved with ID: {}", document.getId());

        try {
            // Step 3: Transition to PROCESSING
            document.setStatus(Status.PROCESSING);
            document = documentRepository.save(document);

            // Step 4: Parse PDF → one AI Document per page
            List<org.springframework.ai.document.Document> parsedPages =
                    documentParserService.parse(filePath);

            // Step 5: Chunk pages into smaller overlapping segments
            List<org.springframework.ai.document.Document> chunks =
                    textChunkingService.chunk(parsedPages);

            // Step 6: Add source document ID as metadata on each chunk
            // This links vector embeddings back to the original Document entity
            String documentId = document.getId().toString();
            for (org.springframework.ai.document.Document chunk : chunks) {
                chunk.getMetadata().put("documentId", documentId);
                chunk.getMetadata().put("fileName", file.getOriginalFilename());
            }

            // Step 7: Embed + store in pgvector (Spring AI handles embedding automatically)
            vectorStore.add(chunks);
            log.info("Stored {} chunks in vector store for document: {}", chunks.size(), documentId);

            // Step 8: Mark as READY
            document.setStatus(Status.READY);
            document = documentRepository.save(document);

        } catch (Exception e) {
            // On any failure: mark as FAILED and log the error
            log.error("Ingestion failed for document: {}", document.getId(), e);
            document.setStatus(Status.FAILED);
            documentRepository.save(document);
            throw new DocumentProcessingException(
                    "Ingestion failed for: " + file.getOriginalFilename(), e);
        }

        // Build and return the response DTO
        return DocumentUploadResponseDto.builder()
                .id(document.getId())
                .fileName(document.getFileName())
                .status(document.getStatus())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
