package com.example.communicationservice.domain.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.communicationservice.domain.repositories.CommentRepository;
import com.example.communicationservice.domain.repositories.LikesRepository;
import com.example.communicationservice.domain.repositories.PostRepository;
import com.example.communicationservice.model.Likes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeService {

    private static final String ENTITY_NAME = "likes";

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    private final FollowRepository followRepository;

    private final LikesRepository likesRepository;

    public Mono<Likes> likePostByUser(String userId, Long postId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Likes newLike = new Likes();
                    newLike.setUserId(user.getId());
                    newLike.setPostId(postId);

                    return likesRepository.save(newLike);
                });
    }

    public Mono<Void> unlikePostByUser(String userId, Long postId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> likesRepository.findByUserIdAndPostId(user.getId(), postId))
                .flatMap(likesRepository::delete);
    }
}
