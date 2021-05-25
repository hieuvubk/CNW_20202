package com.company.pm.interactionservice.domain.services;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.interactionservice.CommentLike;
import com.company.pm.interactionservice.domain.repositories.CommentLikeRepository;
import com.company.pm.interactionservice.domain.repositories.CommentRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.company.pm.userservice.domain.services.dto.UserDTO;
import com.company.pm.userservice.domain.services.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class CommentLikeService {
    
    private static final String ENTITY_NAME = "comment_like";
    
    private final UserMapper userMapper;
    
    private final CommentLikeRepository commentLikeRepository;
    
    private final CommentRepository commentRepository;
    
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public Flux<UserDTO> getUsersLikeComment(Long commentId) {
        return commentLikeRepository.findByComment(commentId)
            .map(commentLike -> userMapper.userToUserDto(commentLike.getUser()));
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countUsersLikeComment(Long commentId) {
        return commentLikeRepository.countByComment(commentId);
    }
    
    @Transactional
    public Mono<CommentLike> likeCommentByUser(String userId, Long commentId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> commentRepository.findById(commentId)
                .flatMap(comment -> {
                    CommentLike commentLike = CommentLike.builder()
                        .comment(comment)
                        .commentId(comment.getId())
                        .user(user)
                        .userId(user.getId())
                        .createdAt(Instant.now())
                        .build();
                    
                    return commentLikeRepository.save(commentLike);
                })
            );
    }
    
    @Transactional
    public Mono<Void> unlikeCommentByUser(String userId, Long commentId) {
        return commentLikeRepository.findByUserAndComment(userId, commentId)
            .flatMap(commentLikeRepository::delete);
    }
}
