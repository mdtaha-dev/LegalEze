package com.abhijeet.legalEze.service;

import com.abhijeet.legalEze.exception.DocumentProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.List;

/**
 * Extracts text content from PDF files using Spring AI's {@link PagePdfDocumentReader}.
 *
 * <p>Each page of the PDF becomes a separate {@link Document} object, preserving
 * page-level metadata (page number, source file) that carries through the rest
 * of the ingestion pipeline.</p>
 *
 * <h3>Why page-level splitting?</h3>
 * <p>Legal documents are often referenced by page number.  By keeping each page
 * as a distinct document at this stage, downstream chunking can preserve the
 * page-of-origin metadata — making it possible to cite exact page numbers in
 * RAG responses.</p>
 */
@Service
@Slf4j
public class DocumentParserService {

    /**
     * Parses a PDF file and returns one {@link Document} per page.
     *
     * @param filePath absolute path to the PDF on disk
     * @return list of Spring AI documents, one per page
     * @throws DocumentProcessingException if the file cannot be read or parsed
     */
    public List<Document> parse(String filePath) {
        log.info("Parsing PDF: {}", filePath);

        try {
            Resource pdfResource = new FileSystemResource(Path.of(filePath));

            if (!pdfResource.exists()) {
                throw new DocumentProcessingException("PDF file not found: " + filePath);
            }

            PagePdfDocumentReader reader = new PagePdfDocumentReader(pdfResource);
            List<Document> documents = reader.read();

            log.info("Parsed {} pages from: {}", documents.size(), filePath);
            return documents;

        } catch (DocumentProcessingException e) {
            throw e; // re-throw our own exceptions as-is
        } catch (Exception e) {
            throw new DocumentProcessingException(
                    "Failed to parse PDF: " + filePath, e);
        }
    }
}
