package com.abhijeet.legalEze.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link FileStorageServiceImpl}.
 *
 * <p>These are <b>pure unit tests</b> — no Spring context, no database,
 * no Docker required.  JUnit's {@link TempDir} provides a throwaway
 * directory for each test run.</p>
 */
class FileStorageServiceImplTest {

    /** The service under test. */
    private FileStorageServiceImpl fileStorageService;

    /**
     * JUnit provides a fresh temporary directory for every test method.
     * We inject it as the storage root so we never pollute the real filesystem.
     */
    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        fileStorageService = new FileStorageServiceImpl();
        // Inject the temp directory as the storage root (simulates @Value injection)
        ReflectionTestUtils.setField(fileStorageService, "storageDir", tempDir.toString());
        // Trigger the @PostConstruct lifecycle method manually
        fileStorageService.init();
    }

    // -------------------------------------------------------------------------
    //  storeFile() tests
    // -------------------------------------------------------------------------

    @Test
    void storeFile_shouldSaveFileAndReturnPath() throws Exception {
        // Arrange — create a fake PDF upload
        byte[] content = "sample legal contract content".getBytes();
        MockMultipartFile file = new MockMultipartFile(
                "file",                   // form field name
                "contract.pdf",           // original filename
                "application/pdf",        // content type
                content                   // file bytes
        );

        // Act
        String storedPath = fileStorageService.storeFile(file);

        // Assert — file exists and contains the right bytes
        assertNotNull(storedPath, "Returned path should not be null");
        Path path = Path.of(storedPath);
        assertTrue(Files.exists(path), "Stored file should exist on disk");
        assertArrayEquals(content, Files.readAllBytes(path),
                "File content should match the uploaded bytes");
        // Filename should contain the original name (after the UUID prefix)
        assertTrue(path.getFileName().toString().endsWith("_contract.pdf"),
                "Filename should be UUID-prefixed with original name");
    }

    @Test
    void storeFile_shouldGenerateUniqueNames() throws Exception {
        // Arrange — two files with the same original name
        MockMultipartFile file1 = new MockMultipartFile(
                "file", "same_name.pdf", "application/pdf", "content1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile(
                "file", "same_name.pdf", "application/pdf", "content2".getBytes());

        // Act
        String path1 = fileStorageService.storeFile(file1);
        String path2 = fileStorageService.storeFile(file2);

        // Assert — paths are different (UUID prefix guarantees uniqueness)
        assertNotEquals(path1, path2,
                "Two uploads with the same name should produce different paths");
        assertTrue(Files.exists(Path.of(path1)));
        assertTrue(Files.exists(Path.of(path2)));
    }

    // -------------------------------------------------------------------------
    //  deleteFile() tests
    // -------------------------------------------------------------------------

    @Test
    void deleteFile_shouldRemoveExistingFile() throws Exception {
        // Arrange — store a file first
        MockMultipartFile file = new MockMultipartFile(
                "file", "to_delete.pdf", "application/pdf", "delete me".getBytes());
        String storedPath = fileStorageService.storeFile(file);
        assertTrue(Files.exists(Path.of(storedPath)), "Pre-condition: file should exist");

        // Act
        fileStorageService.deleteFile(storedPath);

        // Assert
        assertFalse(Files.exists(Path.of(storedPath)),
                "File should be removed after deleteFile()");
    }

    @Test
    void deleteFile_shouldNotThrowWhenFileDoesNotExist() {
        // Arrange — a path that doesn't exist
        String fakePath = tempDir.resolve("nonexistent.pdf").toString();

        // Act & Assert — should complete without throwing
        assertDoesNotThrow(() -> fileStorageService.deleteFile(fakePath),
                "Deleting a non-existent file should not throw");
    }
}
