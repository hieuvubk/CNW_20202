package com.company.pm.interactionservice.domain.services.dto;

import com.company.pm.interactionservice.domain.services.validators.ValidVisionable;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@RequiredArgsConstructor
public class PostDTO {
    
    @NotNull
    @Size(min = 1)
    private final String content;
    
    @ValidVisionable
    private final String visionable;
}

