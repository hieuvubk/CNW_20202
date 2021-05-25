package com.company.pm.interactionservice.web;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.interactionservice.Like;
import com.company.pm.interactionservice.domain.services.LikeService;
import com.company.pm.userservice.domain.assembler.PublicUserRepresentationModelAssembler;
import com.company.pm.userservice.domain.services.UserService;
import com.company.pm.userservice.domain.services.dto.UserDTO;
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

@RestController
@RequestMapping(
    path = "/api/v1/posts/{id}",
    produces = MediaTypes.HAL_JSON_VALUE
)
@RequiredArgsConstructor
public class LikeController {
    
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    private static final String ENTITY_NAME = "like";
    
    private final PublicUserRepresentationModelAssembler userAssembler;
    
    private final LikeService likeService;
    
    private final UserService userService;
    
    @GetMapping(path = "/likes")
    public Mono<CollectionModel<EntityModel<UserDTO>>> getUserLike(
        @PathVariable("id") Long postId,
        @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<UserDTO> userFlux = likeService.getUsersLikePost(postId);
        
        return userAssembler.toCollectionModel(userFlux, exchange);
    }
    
    @GetMapping(path = "/likes/count")
    public Mono<Long> countLike(@PathVariable("id") Long postId) {
        return likeService.countUsersLikePost(postId);
    }
    
    @PostMapping(
        path = "/action/like",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<Like>> likePost(
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
    
    @DeleteMapping(path = "/action/unlike")
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
