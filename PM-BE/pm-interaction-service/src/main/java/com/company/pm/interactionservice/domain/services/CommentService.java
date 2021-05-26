package com.company.pm.interactionservice.domain.services;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.companyservice.domain.repositories.CompanyRepository;
import com.company.pm.domain.interactionservice.Comment;
import com.company.pm.interactionservice.domain.repositories.CommentRepository;
import com.company.pm.interactionservice.domain.repositories.PostRepository;
import com.company.pm.interactionservice.domain.services.dto.CommentDTO;
import com.company.pm.interactionservice.domain.services.mapper.CommentMapper;
import com.company.pm.userservice.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class CommentService {
    
    private final static String ENTITY_NAME = "comment";
    
    private final CommentMapper mapper;
    
    private final CommentRepository commentRepository;
    
    private final PostRepository postRepository;
    
    private final UserRepository userRepository;
    
    private final CompanyRepository companyRepository;
    
    @Transactional(readOnly = true)
    public Flux<Comment> getCommentsByPost(Long postId) {
        return postRepository.findById(postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
            .flatMapMany(post -> commentRepository.findByPost(post.getId()));
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countCommentsByPost(Long postId) {
        return postRepository.findById(postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
            .flatMap(post -> commentRepository.countByPost(post.getId()));
    }
    
    @Transactional(readOnly = true)
    public Flux<Comment> getRepliesByComment(Long postId, Long cmtId) {
        return commentRepository.findByIdAndPost(cmtId, postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
            .flatMapMany(comment -> commentRepository.findByParentComment(comment.getId()));
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countRepliesByComment(Long postId, Long cmtId) {
        return commentRepository.findByIdAndPost(cmtId, postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
            .flatMap(comment -> commentRepository.countByParentComment(comment.getId()));
    }
    
    @Transactional
    public Mono<Comment> createCommentToPost(String userId, Long postId, CommentDTO commentDTO) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> postRepository.findById(postId)
                 .flatMap(post -> {
                     Comment comment = mapper.commentDTOToComment(commentDTO);
                     comment.setAuthor(user);
                     comment.setAuthorId(user.getId());
                     comment.setPost(post);
                     comment.setPostId(post.getId());
                     comment.setCreatedAt(Instant.now());
                     comment.setUpdatedAt(Instant.now());
    
                     return companyRepository.findByAdminAndId(user.getId(), comment.getCompanyId())
                         .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN)))
                         .flatMap(company -> {
                             comment.setCompany(company);
                             
                             return commentRepository.save(comment);
                         });
                 })
            );
    }
    
    @Transactional
    public Mono<Comment> createReplyToComment(String userId, Long commentId, CommentDTO commentDTO) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> commentRepository.findById(commentId)
                .flatMap(parentComment -> {
                    Comment comment = mapper.commentDTOToComment(commentDTO);
                    comment.setParentComment(parentComment);
                    comment.setParentCommentId(parentComment.getId());
                    comment.setAuthor(user);
                    comment.setAuthorId(user.getId());
                    comment.setPost(parentComment.getPost());
                    comment.setPostId(parentComment.getPostId());
                    comment.setCreatedAt(Instant.now());
                    comment.setUpdatedAt(Instant.now());
    
                    return companyRepository.findByAdminAndId(user.getId(), comment.getCompanyId())
                        .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN)))
                        .flatMap(company -> {
                            comment.setCompany(company);
            
                            return commentRepository.save(comment);
                        });
                })
            );
    }
    
    @Transactional
    public Mono<Comment> updateComment(String userId, Long commentId, CommentDTO commentDTO) {
        return commentRepository.findByIdAndAuthor(commentId, userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "comment", "idnotfound")))
            .flatMap(comment -> {
                Comment update = mapper.commentDTOToComment(commentDTO);
                
                if (update.getContent() != null) {
                    comment.setContent(update.getContent());
                    comment.setUpdatedAt(Instant.now());
                }
                if (update.getCompanyId() != null) {
                    return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN));
                }
                
                return commentRepository.save(comment);
            });
    }
    
    @Transactional
    public Mono<Void> deleteComment(String userId, Long commentId) {
        return commentRepository.findByIdAndAuthor(commentId, userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound")))
            .flatMap(commentRepository::delete);
    }
    
}
