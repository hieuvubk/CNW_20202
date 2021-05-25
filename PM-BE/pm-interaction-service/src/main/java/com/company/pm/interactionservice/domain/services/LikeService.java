package com.company.pm.interactionservice.domain.services;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.interactionservice.Like;
import com.company.pm.interactionservice.domain.repositories.LikeRepository;
import com.company.pm.interactionservice.domain.repositories.PostRepository;
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
public class LikeService {

    private final static String ENTITY_NAME = "like";
    
    private final UserMapper userMapper;
    
    private final PostRepository postRepository;
    
    private final LikeRepository likeRepository;
    
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public Flux<UserDTO> getUsersLikePost(Long postId) {
        return postRepository.findById(postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
            .flatMapMany(post -> likeRepository.findByPost(post.getId()))
            .flatMap(like -> userRepository.findById(like.getUserId()))
            .map(userMapper::userToUserDto);
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countUsersLikePost(Long postId) {
        return postRepository.findById(postId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
            .flatMap(post -> likeRepository.countByPost(post.getId()));
    }
    
    @Transactional
    public Mono<Like> likePostByUser(String userId, Long postId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> {
                    Like like = Like.builder()
                        .user(user)
                        .userId(user.getId())
                        .post(post)
                        .postId(post.getId())
                        .createdAt(Instant.now())
                        .build();

                    return likeRepository.save(like);
                })
            );
    }
    
    @Transactional
    public Mono<Void> unlikePostByUser(String userId, Long postId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> likeRepository.findByUserAndPost(user.getId(), postId))
            .flatMap(likeRepository::delete);
    }
}
