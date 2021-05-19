package com.example.communicationservice.controller;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.userservice.domain.services.UserService;
import com.example.communicationservice.domain.assembler.PostRepresentationModelAssembler;
import com.example.communicationservice.domain.service.LikeService;
import com.example.communicationservice.domain.service.PostService;
import com.example.communicationservice.model.Likes;
import com.example.communicationservice.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;
import tech.jhipster.web.util.HeaderUtil;

import javax.validation.Valid;

@RestController
@RequestMapping(
        path = "/api/v1/post",
        produces = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
public class PostController {

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private static final String ENTITY_NAME = "post";

    private final PostRepresentationModelAssembler postAssembler;

    private final PostService postService;

    private final UserService userService;

    private final LikeService likeService;

    @GetMapping(
            produces = MediaTypes.HAL_JSON_VALUE
    )
    public Mono<CollectionModel<EntityModel<Post>>> getPosts(
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> {
                                    Flux<Post> postFlux = postService.getAllPostByUser(user.getId());

                                    return postAssembler.toCollectionModel(postFlux, exchange);
                                });
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }


    @GetMapping(path = "/count")
    public Mono<Long> countPosts(@ApiIgnore ServerWebExchange exchange) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> postService.countPostByUser(user.getId()));
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @PostMapping(
            path = "/actions/create",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<Post>> createPost(
            @Valid Post newPost,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> postService.createPost(user.getId(), newPost)
                                        .map(post -> ResponseEntity
                                                .ok()
                                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, post.getId().toString()))
                                                .body(post)
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }


    @PatchMapping(
            path = "/action/update/{id}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<EntityModel<Post>>> updatePost(
            @PathVariable("id") Long postId,
            Post newPost,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> postService.updatePost(user.getId(), postId, newPost)
                                        .flatMap(post -> postAssembler
                                                .toModel(post, exchange)
                                                .map(model -> ResponseEntity
                                                        .ok()
                                                        .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
                                                                post.getId().toString()))
                                                        .body(model)
                                                )
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @DeleteMapping(path = "/action/delete/{id}")
    public Mono<ResponseEntity<Void>> deletePost(
            @PathVariable("id") Long postId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> postService.deletePost(user.getId(), postId)
                                        .thenReturn(ResponseEntity.noContent()
                                                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, postId.toString()))
                                                .build()
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @PostMapping(
            path = "/actions/like/{id}",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<Likes>> likePost(
            @PathVariable("id") Long postId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> likeService.likePostByUser(user.getId(), postId)
                                        .map(like -> ResponseEntity
                                                .ok()
                                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, like.getId().toString()))
                                                .body(like)
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @DeleteMapping(path = "/action/unlike/{id}")
    public Mono<ResponseEntity<Void>> unlikePost(
            @PathVariable("id") Long postId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> likeService.unlikePostByUser(user.getId(), postId)
                                        .thenReturn(ResponseEntity.noContent()
                                                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, postId.toString()))
                                                .build()
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }
}
