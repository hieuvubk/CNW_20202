package com.example.communicationservice.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.communicationservice.model.Likes;
import com.example.communicationservice.repositories.CommentRepository;
import com.example.communicationservice.repositories.LikesRepository;
import com.example.communicationservice.repositories.PostRepository;
import com.example.communicationservice.service.dto.PostDTO;
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

    public Mono<Likes> likePostByUser(String userId, PostDTO post) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Likes newLike = new Likes();
                    newLike.setUserId(user.getId());
                    newLike.setPostId(post.getId());

                    return likesRepository.save(newLike);
                });
    }

    public Mono<Void> unlikePostByUser(String userId, PostDTO post) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> likesRepository.findByUserIdAndPostId(user.getId(), post.getId()))
                .flatMap(likesRepository::delete);
    }
}
