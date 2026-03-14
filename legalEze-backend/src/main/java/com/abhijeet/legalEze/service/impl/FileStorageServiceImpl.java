package com.abhijeet.legalEze.service.impl;

import com.abhijeet.legalEze.service.FileStorageService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Local-disk implementation of {@link FileStorageService}.
 *
 * <p>Stores uploaded files in a configurable directory ({@code file.storage.dir},
 * defaults to {@code ./uploads}).  Each file is saved with a UUID prefix so that
 * two uploads with the same original filename never collide.</p>
 *
 * <h3>How it works</h3>
 * <ol>
 *   <li>{@link #init()} runs after construction and creates the storage directory
 *       if it doesn't already exist.</li>
 *   <li>{@link #storeFile(MultipartFile)} generates a unique name
 *       ({@code <UUID>_<originalFilename>}), copies the bytes into that file,
 *       and returns the <b>absolute path</b> so the caller can persist it in the
 *       database or pass it to the ingestion pipeline.</li>
 *   <li>{@link #deleteFile(String)} removes a previously stored file.  If the
 *       file is already gone it logs a warning instead of throwing — this keeps
 *       cleanup operations idempotent.</li>
 * </ol>
 */
@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    /**
     * Root directory where uploaded files are stored.
     * Injected from the {@code file.storage.dir} property in
     * {@code application.properties} (defaults to {@code ./uploads}).
     */
    @Value("${file.storage.dir:./uploads}")
    private String storageDir;

    /** Resolved absolute path of the storage directory. */
    private Path rootLocation;

    /**
     * Creates the storage directory on the filesystem if it does not exist.
     * Called automatically by Spring after dependency injection is complete.
     */
    @PostConstruct
    public void init() {
        rootLocation = Paths.get(storageDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(rootLocation);
            log.info("File storage directory initialised at: {}", rootLocation);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not create file storage directory: " + rootLocation, e);
        }
    }

    /**
     * Stores the uploaded file on disk and returns its absolute path.
     *
     * <p>The file is saved as {@code <UUID>_<originalFilename>} to guarantee
     * uniqueness even when multiple users upload files with the same name
     * at the same time.</p>
     *
     * @param file the multipart file received from the HTTP request
     * @return the absolute path of the stored file (never {@code null})
     * @throws RuntimeException if the file cannot be written to disk
     */
    @Override
    public String storeFile(MultipartFile file) {
        // Build a collision-proof filename:  e.g.  a3f8…b2c1_contract.pdf
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID() + "_" + originalFilename;

        // Resolve the full target path inside the storage directory
        Path targetPath = rootLocation.resolve(uniqueFilename).normalize();

        try {
            // Copy the upload stream to disk, replacing any (unlikely) existing file
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("Stored file: {} ({} bytes)", targetPath, file.getSize());
            return targetPath.toString();
        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to store file: " + originalFilename, e);
        }
    }

    /**
     * Deletes the file at the given path.
     *
     * <p>If the file does not exist (perhaps it was already deleted), a warning
     * is logged but <strong>no exception is thrown</strong>.  This makes the
     * operation safe to call repeatedly (idempotent).</p>
     *
     * @param filePath absolute path of the file to delete
     */
    @Override
    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            if (Files.deleteIfExists(path)) {
                log.info("Deleted file: {}", path);
            } else {
                log.warn("File not found, nothing to delete: {}", path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + filePath, e);
        }
    }
}
