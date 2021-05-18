package com.example.communicationservice.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.communicationservice.model.Comment;
import com.example.communicationservice.repositories.CommentRepository;
import com.example.communicationservice.repositories.PostRepository;
import com.example.communicationservice.service.dto.ReplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CommentService {

    private static final String ENTITY_NAME = "comment";

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    public Flux<ReplyDTO> getAllReplyOfComment(String cmtId) {
        return commentRepository.findById(Long.parseLong(cmtId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMapMany(comment -> commentRepository.findAllByRootCommentId(comment.getId()))
                .map(comment -> new ReplyDTO(comment.getId(), comment.getRootCommentId()));
    }

    public Mono<Long> countAllReplyofComment(String cmtId) {
        return commentRepository.findById(Long.parseLong(cmtId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMap(comment -> commentRepository.countAllByRootCommentId(comment.getId()));
    }

    public Mono<Comment> createCommentToPost()
}
