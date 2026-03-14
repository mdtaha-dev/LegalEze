package com.abhijeet.legalEze.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Splits parsed documents into smaller, overlapping text chunks suitable for
 * embedding and vector storage.
 *
 * <h3>Why token-based splitting?</h3>
 * <p>Character-based splitting can cut words (or even sentences) in half.
 * Token-based splitting via {@link TokenTextSplitter} respects token boundaries,
 * which aligns with how embedding models and LLMs tokenise text — producing
 * higher-quality embeddings and better retrieval results.</p>
 *
 * <h3>Why overlap?</h3>
 * <p>An overlap of 200 tokens between consecutive chunks ensures that context
 * at chunk boundaries is not lost.  If a key clause spans two chunks, both
 * chunks will contain enough surrounding context for accurate retrieval.</p>
 *
 * <h3>Default configuration</h3>
 * <ul>
 *   <li><b>Chunk size:</b> 800 tokens — large enough to capture a full legal
 *       paragraph, small enough to stay well within the Gemini embedding
 *       model's context window.</li>
 *   <li><b>Overlap:</b> 200 tokens — ~25% overlap provides good continuity.</li>
 *   <li><b>Min chunk size:</b> 100 tokens — discards tiny trailing fragments
 *       that would produce low-quality embeddings.</li>
 * </ul>
 */
@Service
@Slf4j
public class TextChunkingService {

    private static final int DEFAULT_CHUNK_SIZE = 800;
    private static final int DEFAULT_OVERLAP = 200;
    private static final int MIN_CHUNK_SIZE = 100;

    private final TokenTextSplitter splitter;

    public TextChunkingService() {
        this.splitter = new TokenTextSplitter(
                DEFAULT_CHUNK_SIZE,
                DEFAULT_OVERLAP,
                MIN_CHUNK_SIZE,
                Integer.MAX_VALUE,  // max number of chunks — no limit
                true                // keep separator tokens
        );
    }

    /**
     * Splits a list of documents into smaller chunks.
     *
     * <p>Metadata from the original documents (page number, source file) is
     * automatically propagated to each chunk by Spring AI's splitter.</p>
     *
     * @param documents parsed documents (typically one per PDF page)
     * @return chunked documents ready for embedding
     */
    public List<Document> chunk(List<Document> documents) {
        log.info("Chunking {} documents (chunkSize={}, overlap={})",
                documents.size(), DEFAULT_CHUNK_SIZE, DEFAULT_OVERLAP);

        List<Document> chunks = splitter.split(documents);

        log.info("Produced {} chunks from {} documents", chunks.size(), documents.size());
        return chunks;
    }
}
