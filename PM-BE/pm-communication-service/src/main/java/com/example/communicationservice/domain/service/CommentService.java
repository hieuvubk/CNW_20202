package com.example.communicationservice.domain.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.communicationservice.domain.repositories.CommentRepository;
import com.example.communicationservice.domain.repositories.PostRepository;
import com.example.communicationservice.domain.service.dto.CommentDTO;
import com.example.communicationservice.domain.service.dto.PostDTO;
import com.example.communicationservice.model.Comment;
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

    public Flux<Comment> getAllCommentOfUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMapMany(user -> commentRepository.findAllByUserId(user.getId()));
    }

    public Flux<Comment> getAllReplyOfComment(Long cmtId) {
        return commentRepository.findById(cmtId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMapMany(comment -> commentRepository.findAllByRootCommentId(comment.getId()));
    }

    public Mono<Long> countAllReplyofComment(Long cmtId) {
        return commentRepository.findById(cmtId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMap(comment -> commentRepository.countAllByRootCommentId(comment.getId()));
    }

    public Mono<Comment> createCommentToPost(String userId, PostDTO postDTO, Comment comment) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Comment cmt = new Comment();

                    cmt.setPostId(postDTO.getId());
                    cmt.setContent(comment.getContent());
                    cmt.setTime(comment.getTime());
                    cmt.setUserId(user.getId());

                    return commentRepository.save(cmt);
                });
    }

    public Mono<Comment> createReplyToComment(String userId, CommentDTO commentDTO, Comment comment) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Comment cmt = new Comment();

                    cmt.setRootCommentId(commentDTO.getCommentId());
                    cmt.setContent(comment.getContent());
                    cmt.setTime(comment.getTime());
                    cmt.setUserId(userId);

                    return commentRepository.save(cmt);
                });
    }

    //Use for both comment and reply
    public Mono<Comment> updateComment(String userId, Long cmtId, Comment newComment) {
        return commentRepository.findById(cmtId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMap(comment -> {
                    try {
                        comment.setTime(newComment.getTime());
                        comment.setContent(newComment.getContent());
                        return commentRepository.save(comment);
                    } catch (Exception e) {
                        return Mono.error(new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "invalid"));
                    }
                });
    }

    //Use for both comment and reply
    public Mono<Void> deleteComment(String userId, Long commentId) {
        return commentRepository.findById(commentId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
                .flatMap(commentRepository::delete);
    }





}
