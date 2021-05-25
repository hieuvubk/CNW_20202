//package com.company.pm.interactionservice.domain.services;
//
//import com.company.pm.common.enumeration.RelStatus;
//import com.company.pm.common.web.errors.BadRequestAlertException;
//import com.company.pm.domain.interactionservice.Post;
//import com.company.pm.interactionservice.domain.repositories.PostRepository;
//import com.company.pm.interactionservice.domain.services.dto.PostDTO;
//import com.company.pm.interactionservice.domain.services.mapper.PostMapper;
//import com.company.pm.socialservice.domain.repositories.RelationshipRepository;
//import com.company.pm.userservice.domain.repositories.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.server.ResponseStatusException;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//
//import java.time.Instant;
//
//@Service
//@RequiredArgsConstructor
//public class PostService {
//
//    private static final String ENTITY_NAME = "post";
//
//    private final PostMapper mapper;
//
//    private final PostRepository postRepository;
//
//    private final UserRepository userRepository;
//
//    private final RelationshipRepository relationshipRepository;
//
//    @Transactional(readOnly = true)
//    public Flux<Post> getPostsByUser(String userId) {
//        return postRepository.findByAuthor(userId);
//    }
//
//    @Transactional(readOnly = true)
//    public Mono<Post> getPostByUser(String userId, Long postId) {
//        return postRepository.findByIdAndAuthor(postId, userId)
//            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound")));
//    }
//
//    @Transactional(readOnly = true)
//    public Flux<Post> getPostsByAnotherUser(String userId, String anotherId) {
//        return relationshipRepository.findByRequesterIdAndAddresseeId(userId, anotherId)
//            .flatMapMany(relationship -> {
//                if (!relationship.getStatus().equals(RelStatus.BLOCKED)) {
//                    if (relationship.getStatus().equals(RelStatus.ACCEPTED)) {
//                        return postRepository.findVisiblePosts(userId);
//                    } else {
//                        return postRepository.findPublicPosts(userId);
//                    }
//                } else {
//                    return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN));
//                }
//            });
//    }
//
//    @Transactional(readOnly = true)
//    public Flux<Post> getPublicPosts(String userId) {
//        return postRepository.findPublicPosts(userId);
//    }
//
//    @Transactional(readOnly = true)
//    public Mono<Post> getPostByAnotherUser(String userId, String anotherId, Long postId) {
//        return relationshipRepository.findByRequesterIdAndAddresseeId(userId, anotherId)
//            .flatMap(relationship -> {
//                if (!relationship.getStatus().equals(RelStatus.BLOCKED)) {
//                    if (relationship.getStatus().equals(RelStatus.ACCEPTED)) {
//                        return postRepository.findVisiblePostById(userId, postId);
//                    } else {
//                        return postRepository.findPublicPostById(userId, postId);
//                    }
//                } else {
//                    return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN));
//                }
//            });
//    }
//
//    @Transactional
//    public Mono<Post> createPostByUser(String userId, PostDTO postDTO) {
//        return userRepository.findById(userId)
//            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
//            .flatMap(user -> {
//                Post post = mapper.postDTOToPost(postDTO);
//                post.setAuthor(user);
//                post.setAuthorId(user.getId());
//                post.setCreatedAt(Instant.now());
//                post.setUpdatedAt(Instant.now());
//
//                return postRepository.save(post);
//            });
//    }
//
//    @Transactional
//    public Mono<Post> updatePostByUser(String userId, Long postId, PostDTO postDTO) {
//        return getPostByUser(userId, postId)
//            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound")))
//            .flatMap(post -> {
//                Post update = mapper.postDTOToPost(postDTO);
//
//                if (update.getContent() != null) {
//                    post.setContent(update.getContent());
//                    post.setUpdatedAt(Instant.now());
//                }
//                if (update.getVisionable() != null) {
//                    post.setVisionable(update.getVisionable());
//                    post.setUpdatedAt(Instant.now());
//                }
//                if (update.getJobType() != null) {
//                    post.setJobType(update.getJobType());
//                    post.setUpdatedAt(Instant.now());
//                }
//
//                return postRepository.save(post);
//            });
//    }
//
//    @Transactional
//    public Mono<Void> deletePostByUser(String userId, Long postId) {
//        return getPostByUser(userId, postId)
//            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound")))
//            .flatMap(postRepository::delete);
//    }
//}
