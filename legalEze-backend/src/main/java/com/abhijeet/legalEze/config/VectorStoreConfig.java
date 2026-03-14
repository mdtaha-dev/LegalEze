package com.abhijeet.legalEze.config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

import static org.springframework.ai.vectorstore.pgvector.PgVectorStore.PgDistanceType.COSINE_DISTANCE;
import static org.springframework.ai.vectorstore.pgvector.PgVectorStore.PgIndexType.HNSW;

/**
 * Explicit wiring of the {@link VectorStore} bean used by the RAG pipeline.
 *
 * <h3>Why an explicit config instead of relying on auto-configuration?</h3>
 * <p>Spring AI's pgvector starter <em>can</em> auto-create the bean, but
 * defining it ourselves gives us:</p>
 * <ul>
 *   <li><b>Visibility</b> — engineers can see exactly how the store is
 *       constructed without digging through auto-config source code.</li>
 *   <li><b>Control</b> — we can later customise the schema name, table name,
 *       distance threshold, or add a decorator (e.g. caching) in one place.</li>
 *   <li><b>Testability</b> — integration tests can override this bean with a
 *       mock or in-memory implementation.</li>
 * </ul>
 *
 * <h3>What this wires together</h3>
 * <ol>
 *   <li><b>{@link JdbcTemplate}</b> — auto-configured by Spring Boot from the
 *       PostgreSQL datasource.  Provides raw JDBC access to the
 *       {@code vector_store} table that pgvector manages.</li>
 *   <li><b>{@link EmbeddingModel}</b> — auto-configured by the
 *       {@code spring-ai-starter-model-google-genai-embedding} starter.
 *       Uses the Gemini {@code text-embedding-004} model (768 dimensions)
 *       as set in {@code application.properties}.</li>
 * </ol>
 *
 * <p>The resulting {@link PgVectorStore} uses the <b>HNSW</b> index with
 * <b>cosine distance</b> and <b>768 dimensions</b> — matching the values
 * already declared in {@code application.properties}.</p>
 */
@Configuration
@ConditionalOnBean(DataSource.class)
public class VectorStoreConfig {

    /** Number of dimensions produced by the Gemini text-embedding-004 model. */
    private static final int EMBEDDING_DIMENSIONS = 768;

    /**
     * Creates a {@link PgVectorStore} backed by PostgreSQL + pgvector.
     *
     * @param jdbcTemplate   auto-configured JDBC template pointing at the
     *                       PostgreSQL datasource
     * @param embeddingModel auto-configured Gemini embedding model
     * @return a ready-to-use vector store
     */
    @Bean
    public VectorStore pgVectorStore(JdbcTemplate jdbcTemplate, EmbeddingModel embeddingModel) {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
                .dimensions(EMBEDDING_DIMENSIONS)
                .distanceType(COSINE_DISTANCE)
                .indexType(HNSW)
                .initializeSchema(true)      // auto-create the vector_store table
                .schemaName("public")
                .build();
    }
}
