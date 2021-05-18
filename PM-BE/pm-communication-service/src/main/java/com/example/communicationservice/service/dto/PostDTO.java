package com.example.communicationservice.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class PostDTO {

    @NotNull
    @Size(min = 1)
    private final String id;

    private final String creatorId;

    private final String visionable;

}
