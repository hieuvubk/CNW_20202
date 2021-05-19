package com.example.communicationservice.controller;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.userservice.domain.services.UserService;
import com.example.communicationservice.domain.assembler.CommentRepresentationModelAssembler;
import com.example.communicationservice.domain.service.CommentService;
import com.example.communicationservice.domain.service.PostService;
import com.example.communicationservice.domain.service.dto.CommentDTO;
import com.example.communicationservice.domain.service.dto.PostDTO;
import com.example.communicationservice.model.Comment;
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
        path = "/api/v1/comment",
        produces = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
public class CommentController {

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private static final String ENTITY_NAME = "comment";

    private final CommentRepresentationModelAssembler commentAssembler;

    private final CommentService commentService;

    private final PostService postService;

    private final UserService userService;

    @GetMapping(
            produces = MediaTypes.HAL_JSON_VALUE
    )
    public Mono<CollectionModel<EntityModel<Comment>>> getComments(
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> {
                                    Flux<Comment> cmtFlux = commentService.getAllCommentOfUser(user.getId());

                                    return commentAssembler.toCollectionModel(cmtFlux, exchange);
                                });
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @PostMapping(
            path = "/actions/createcmt",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<Comment>> creatComment(
            PostDTO postDTO,
            @Valid Comment cmt,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> commentService.createCommentToPost(user.getId(), postDTO, cmt)
                                        .map(comment -> ResponseEntity
                                                .ok()
                                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, comment.getId().toString()))
                                                .body(comment)
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @PostMapping(
            path = "/actions/createreply",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    public Mono<ResponseEntity<Comment>> createReply(
            CommentDTO cmtDTO,
            @Valid Comment cmt,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> commentService.createReplyToComment(user.getId(), cmtDTO, cmt)
                                        .map(reply -> ResponseEntity
                                                .ok()
                                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, reply.getId().toString()))
                                                .body(reply)
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
    public Mono<ResponseEntity<EntityModel<Comment>>> updateComment(
            @PathVariable("id") Long cmtId,
            Comment newComment,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> commentService.updateComment(user.getId(), cmtId, newComment)
                                        .flatMap(comment -> commentAssembler
                                                .toModel(comment, exchange)
                                                .map(model -> ResponseEntity
                                                        .ok()
                                                        .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
                                                                comment.getId().toString()))
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
    public Mono<ResponseEntity<Void>> deleteComment(
            @PathVariable("id") Long cmtId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        return exchange.getPrincipal()
                .flatMap(principal -> {
                    if (principal instanceof AbstractAuthenticationToken) {
                        return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
                                .flatMap(user -> commentService.deleteComment(user.getId(), cmtId)
                                        .thenReturn(ResponseEntity.noContent()
                                                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, cmtId.toString()))
                                                .build()
                                        )
                                );
                    } else {
                        return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
                    }
                });
    }

    @GetMapping(path = "/{id}/reply/count")
    public Mono<Long> countReply(@PathVariable("id") Long cmtId) {
        return commentService.countAllReplyofComment(cmtId);
    }

    @GetMapping(path = "/{id}/reply")
    public Mono<CollectionModel<EntityModel<Comment>>> getReply(
            @PathVariable("id") Long cmtId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<Comment> cmtFlux = commentService.getAllReplyOfComment(cmtId);
        return commentAssembler.toCollectionModel(cmtFlux, exchange);
    }


}


