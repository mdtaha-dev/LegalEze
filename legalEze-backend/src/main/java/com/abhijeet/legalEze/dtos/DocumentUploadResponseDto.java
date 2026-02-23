package com.abhijeet.legalEze.dtos;

import com.abhijeet.legalEze.model.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentUploadResponseDto {

    private UUID id;
    private String fileName;
    private Status status;
    private LocalDateTime createdAt;

}
