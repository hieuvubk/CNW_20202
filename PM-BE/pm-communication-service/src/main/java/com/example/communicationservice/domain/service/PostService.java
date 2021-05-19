package com.example.communicationservice.domain.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.company.pm.userservice.domain.services.dto.UserDTO;
import com.example.communicationservice.domain.repositories.CommentRepository;
import com.example.communicationservice.domain.repositories.LikesRepository;
import com.example.communicationservice.domain.repositories.PostRepository;
import com.example.communicationservice.domain.service.dto.PostDTO;
import com.example.communicationservice.model.Comment;
import com.example.communicationservice.model.Post;
import com.example.communicationservice.model.PostVisionable;
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


    public Mono<Post> getPost(Long postId) {
        return postRepository.findById(postId)
        .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")));
    }

    //find all posts from users whom u follow
    public Flux<PostDTO> getAllPostByFollowingUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMapMany(user -> followRepository.findAllByFollowerId(user.getId()))
                .flatMap(follow -> postRepository.findAllByCreatorId(follow.getFollowedId()))
                .flatMap(post -> {
                    if(!post.getVisionable().equals(PostVisionable.PRIVATE.toString()))
                        return postRepository.findById(post.getId())
                        .map(post1 -> new PostDTO(post1.getId(), post1.getCreatorId(), post1.getVisionable()));
                    else return Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound"));
                });
    }

    public Flux<Post> getAllPostByUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMapMany(user -> postRepository.findAllByCreatorId(user.getId()));

    }

    public Mono<Long> countPostByUser(String userId) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> postRepository.countAllByCreatorId(user.getId()));
    }

    public Flux<Comment> getAllCommentOfPost(Long postId) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMapMany(post -> commentRepository.findAllByPostId(post.getId()));
    }

    public Mono<Long> countCommentOfPost(Long postId) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> commentRepository.countAllByPostId(post.getId()));
    }

    public Flux<UserDTO> getUserLikePost(Long postId) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMapMany(post -> likesRepository.findAllByPostId(post.getId()))
                .flatMap(likes -> userRepository.findById(likes.getUserId()))
                .map(user -> new UserDTO(user.getId(), user.getLogin()));
    }

    public Mono<Long> countUserLikePost(Long postId) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> likesRepository.countAllByPostId(post.getId()));
    }



    //
    public Mono<Post> createPost(String userId, Post newPost) {
        return userRepository.findById(userId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> {
                    Post post = new Post();
                    post.setCreatorId(userId);
                    post.setContent(newPost.getContent());
                    post.setTime(newPost.getTime());
                    post.setJobType(newPost.getJobType());
                    post.setVisionable(newPost.getVisionable());

                    return postRepository.save(post);
                });
    }

    public Mono<Post> updatePost(String userId, Long postId, Post newPost) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(post -> {
                    post.setContent(newPost.getContent());
                    post.setTime(newPost.getTime());
                    post.setVisionable(newPost.getVisionable());

                    return postRepository.save(post);
                });
    }

    public Mono<Void> deletePost(String userId, Long postId) {
        return postRepository.findById(postId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "post", "idnotfound")))
                .flatMap(postRepository::delete);
    }
}
