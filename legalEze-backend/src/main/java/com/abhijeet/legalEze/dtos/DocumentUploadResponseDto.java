package com.abhijeet.legalEze.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentUploadResponseDto {

    @NotBlank
    private String fileName;

    @NotBlank
    private String contentType;

}
