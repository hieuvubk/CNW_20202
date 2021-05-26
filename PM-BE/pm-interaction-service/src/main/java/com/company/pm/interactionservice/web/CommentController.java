package com.company.pm.interactionservice.web;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.interactionservice.Comment;
import com.company.pm.interactionservice.domain.assembler.CommentRepresentationModelAssembler;
import com.company.pm.interactionservice.domain.services.CommentService;
import com.company.pm.interactionservice.domain.services.dto.CommentDTO;
import com.company.pm.userservice.domain.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
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
    path = "/api/v1/posts/{id}",
    produces = MediaTypes.HAL_JSON_VALUE
)
@RequiredArgsConstructor
public class CommentController {
    
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    private static final String ENTITY_NAME = "comment";
    
    private final CommentRepresentationModelAssembler assembler;
    
    private final CommentService commentService;
    
    private final UserService userService;
    
    @GetMapping(path = "/comments")
    public Mono<CollectionModel<EntityModel<Comment>>> getCommentsByPost(
        @PathVariable("id") Long postId,
        @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<Comment> cmtFlux = commentService.getCommentsByPost(postId);
        
        return assembler.toCollectionModel(cmtFlux, exchange);
    }
    
    @GetMapping(path = "/comments/count")
    public Mono<Long> countCommentByPost(@PathVariable("id") Long postId) {
        return commentService.countCommentsByPost(postId);
    }
    
    @PostMapping(
        path = "/comments",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<EntityModel<Comment>>> creatComment(
        @PathVariable("id") Long postId,
        @Valid CommentDTO commentDTO,
        @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
            .flatMap(principal -> {
                if (principal instanceof AbstractAuthenticationToken) {
                    return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                        .flatMap(user -> commentService.createCommentToPost(user.getId(), postId, commentDTO)
                            .flatMap(comment -> assembler
                                .toModel(comment, exchange)
                                .map(model -> ResponseEntity
                                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                                    .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, comment.getId().toString()))
                                    .body(model)
                            ))
                        );
                } else {
                    return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                }
            });
    }
    
    @PostMapping(
        path = "/comments/{commentId}/reply",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<EntityModel<Comment>>> createReply(
        @PathVariable("commentId") Long commentId,
        @Valid CommentDTO commentDTO,
        @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
            .flatMap(principal -> {
                if (principal instanceof AbstractAuthenticationToken) {
                    return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                        .flatMap(user -> commentService.createReplyToComment(user.getId(), commentId, commentDTO)
                            .flatMap(reply -> assembler
                                .toModel(reply, exchange)
                                .map(model -> ResponseEntity
                                    .created(model.getRequiredLink(IanaLinkRelations.SELF).toUri())
                                    .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, reply.getId().toString()))
                                    .body(model)
                            ))
                        );
                } else {
                    return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                }
            });
    }
    
    @PatchMapping(
        path = "/comments/{commentId}",
        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<EntityModel<Comment>>> updateComment(
        @PathVariable("commentId") Long commentId,
        CommentDTO commentDTO,
        @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
            .flatMap(principal -> {
                if (principal instanceof AbstractAuthenticationToken) {
                    return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                        .flatMap(user -> commentService.updateComment(user.getId(), commentId, commentDTO)
                            .flatMap(comment -> assembler
                                .toModel(comment, exchange)
                                .map(model -> ResponseEntity
                                    .ok()
                                    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, comment.getId().toString()))
                                    .body(model)
                                )
                            )
                        );
                } else {
                    return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                }
            });
    }
    
    @DeleteMapping(path = "/comments/{commentId}")
    public Mono<ResponseEntity<Void>> deleteComment(
        @PathVariable("commentId") Long commentId,
        @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
            .flatMap(principal -> {
                if (principal instanceof AbstractAuthenticationToken) {
                    return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                        .flatMap(user -> commentService.deleteComment(user.getId(), commentId)
                            .thenReturn(ResponseEntity.noContent()
                                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, commentId.toString()))
                                .build()
                            )
                        );
                } else {
                    return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                }
            });
    }
    
    @GetMapping(path = "/comments/{commentId}/replies/count")
    public Mono<Long> countReply(
        @PathVariable("id") Long postId,
        @PathVariable("commentId") Long cmtId
    ) {
        return commentService.countRepliesByComment(postId, cmtId);
    }
    
    @GetMapping(path = "/comments/{commentId}/replies")
    public Mono<CollectionModel<EntityModel<Comment>>> getReplies(
        @PathVariable("id") Long postId,
        @PathVariable("commentId") Long cmtId,
        @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<Comment> cmtFlux = commentService.getRepliesByComment(postId, cmtId);
        
        return assembler.toCollectionModel(cmtFlux, exchange);
    }
}
