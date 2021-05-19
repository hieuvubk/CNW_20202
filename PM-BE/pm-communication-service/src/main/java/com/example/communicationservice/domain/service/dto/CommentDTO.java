package com.example.communicationservice.domain.service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@RequiredArgsConstructor
public class CommentDTO {

    @NotNull
    @Size(min = 1)
    private final Long commentId;
}
