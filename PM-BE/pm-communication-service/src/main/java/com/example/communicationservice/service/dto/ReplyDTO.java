package com.example.communicationservice.service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@RequiredArgsConstructor
public class ReplyDTO {

    @NotNull
    @Size(min = 1)
    private final String replyId;

    private final String rootCommentId;
}
