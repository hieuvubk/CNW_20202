package com.example.communicationservice.controller;

import com.company.pm.userservice.domain.assembler.PublicUserRepresentationModelAssembler;
import com.company.pm.userservice.domain.services.dto.UserDTO;
import com.example.communicationservice.domain.assembler.CommentRepresentationModelAssembler;
import com.example.communicationservice.domain.assembler.PostRepresentationModelAssembler;
import com.example.communicationservice.domain.service.PostService;
import com.example.communicationservice.model.Comment;
import com.example.communicationservice.model.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping(
        path = "/api/v1/post",
        produces = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
public class PublicPostController {

    private PostService postService;

    private PostRepresentationModelAssembler postAssembler;

    private PublicUserRepresentationModelAssembler userAssembler;

    private CommentRepresentationModelAssembler commentAssembler;

    @GetMapping(
            path = "/users/{id}",
            produces = MediaTypes.HAL_JSON_VALUE
    )
    public Mono<CollectionModel<EntityModel<Post>>> getPosts(
            @PathVariable("id") String userId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<Post> postFlux = postService.getAllPostByUser(userId);

        return postAssembler.toCollectionModel(postFlux, exchange);
    }

    @GetMapping(path = "/users/{id}/count")
    public Mono<Long> countPostByUser(@PathVariable("id") String userId) {
        return postService.countPostByUser(userId);
    }

    @GetMapping(path = "/{id}")
    public Mono<Post> getPost(@PathVariable("id") Long postId) {
        return postService.getPost(postId);
    }

    @GetMapping(path = "/{id}/like")
    public Mono<Long> countLike(@PathVariable("id") Long postId) {
        return postService.countUserLikePost(postId);
    }

    @GetMapping(
            path = "/{id}/like/users",
            produces = MediaTypes.HAL_JSON_VALUE
    )
    public Mono<CollectionModel<EntityModel<UserDTO>>> getUserLike(
            @PathVariable("id") Long postId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<UserDTO> userFlux = postService.getUserLikePost(postId);
        return userAssembler.toCollectionModel(userFlux, exchange);
    }

    @GetMapping(path = "/{id}/comment/count")
    public Mono<Long> countComment(@PathVariable("id") Long postId) {
        return postService.countCommentOfPost(postId);
    }

    @GetMapping(path = "/{id}/comment")
    public Mono<CollectionModel<EntityModel<Comment>>> getComments(
            @PathVariable("id") Long postId,
            @ApiIgnore ServerWebExchange exchange
    ) {
        Flux<Comment> cmtFlux = postService.getAllCommentOfPost(postId);
        return commentAssembler.toCollectionModel(cmtFlux, exchange);
    }
}
