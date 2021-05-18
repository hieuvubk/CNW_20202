package com.example.communicationservice.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.company.pm.userservice.domain.services.dto.UserDTO;
import com.example.communicationservice.model.Post;
import com.example.communicationservice.model.PostVisionable;
import com.example.communicationservice.repositories.CommentRepository;
import com.example.communicationservice.repositories.LikesRepository;
import com.example.communicationservice.repositories.PostRepository;
import com.example.communicationservice.service.dto.CommentDTO;
import com.example.communicationservice.service.dto.PostDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private static final String ENTITY_NAME = "post";

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    private final FollowRepository followRepository;

    private final LikesRepository likesRepository;

    //find all posts from users whom u follow
    public Flux<PostDTO> getAllPostByFollowingUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMapMany(user -> followRepository.findAllByFollowerId(user.getId()))
                .flatMap(follow -> postRepository.findAllByCreatorId(follow.getFollowedId()))
                .flatMap(post -> {
                    if(!post.getVisionable().equals(PostVisionable.PRIVATE.toString()))
                        return postRepository.findById(Long.parseLong(post.getId()))
                        .map(post1 -> new PostDTO(post1.getId(), post1.getCreatorId(), post1.getVisionable()));
                    else return Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound"));
                });
    }

    public Flux<PostDTO> getAllPostByUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMapMany(user -> postRepository.findAllByCreatorId(user.getId()))
                .map(post -> new PostDTO(post.getId(), post.getCreatorId(), post.getVisionable()));
    }

    public Mono<Long> countPostByUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> postRepository.countAllByCreatorId(user.getId()));
    }

    public Flux<CommentDTO> getAllCommentOfPost(String postId) {
        return postRepository.findById(Long.parseLong(postId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMapMany(post -> commentRepository.findAllByPostId(post.getId()))
                .map(comment -> new CommentDTO(comment.getId()));
    }

    public Mono<Long> countCommentOfPost(String postId) {
        return postRepository.findById(Long.parseLong(postId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> commentRepository.countAllByPostId(post.getId()));
    }

    public Flux<UserDTO> getUserLikePost(String postId) {
        return postRepository.findById(Long.parseLong(postId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMapMany(post -> likesRepository.findAllByPostId(post.getId()))
                .flatMap(likes -> userRepository.findById(likes.getUserId()))
                .map(user -> new UserDTO(user.getId(), user.getLogin()));
    }

    public Mono<Long> countUserLikePost(String postId) {
        return postRepository.findById(Long.parseLong(postId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> likesRepository.countAllByPostId(post.getId()));
    }



    //
    public Mono<Post> createPost(String userId, String content, String time, String jobType, String visionable) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Post post = new Post();
                    post.setCreatorId(userId);
                    post.setContent(content);
                    post.setTime(time);
                    post.setJobType(jobType);
                    post.setVisionable(visionable);

                    return postRepository.save(post);
                });
    }

    public Mono<Void> updatePost(Post newPost) {
        return postRepository.findById(Long.parseLong(newPost.getId()))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> {
                    post.setContent(newPost.getContent());
                    post.setTime(newPost.getTime());
                    post.setVisionable(newPost.getVisionable());

                    return postRepository.save(post);
                })
                .doOnNext(post -> log.debug("Changed post: {}", post))
                .then();
    }

    public Mono<Void> deletePost(String postId) {
        return postRepository.findById(Long.parseLong(postId))
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(postRepository::delete);
    }
}
