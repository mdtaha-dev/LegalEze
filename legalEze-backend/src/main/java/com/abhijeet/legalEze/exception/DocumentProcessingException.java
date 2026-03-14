package com.abhijeet.legalEze.exception;

/**
 * Thrown when document processing fails at any stage of the ingestion pipeline
 * (parsing, chunking, or embedding).
 */
public class DocumentProcessingException extends RuntimeException {

    public DocumentProcessingException(String message) {
        super(message);
    }

    public DocumentProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
