//package com.company.pm.interactionservice.web;
//
//import com.company.pm.common.web.errors.BadRequestAlertException;
//import com.company.pm.domain.interactionservice.Post;
//import com.company.pm.interactionservice.domain.assembler.PublicPostRepresentationModelAssembler;
//import com.company.pm.interactionservice.domain.services.LikeService;
//import com.company.pm.interactionservice.domain.services.PostService;
//import com.company.pm.userservice.domain.assembler.PublicUserRepresentationModelAssembler;
//import com.company.pm.userservice.domain.services.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.hateoas.CollectionModel;
//import org.springframework.hateoas.EntityModel;
//import org.springframework.hateoas.MediaTypes;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//import springfox.documentation.annotations.ApiIgnore;
//
//@RestController
//@RequestMapping(
//    path = "/api/v1/users/{id}/posts",
//    produces = MediaTypes.HAL_JSON_VALUE
//)
//@RequiredArgsConstructor
//public class PublicPostController {
//
//    private final PublicPostRepresentationModelAssembler assembler;
//
//    private final PublicUserRepresentationModelAssembler userAssembler;
//
//    private final PostService postService;
//
//    private final LikeService likeService;
//
//    private final UserService userService;
//
//    @GetMapping
//    public Mono<CollectionModel<EntityModel<Post>>> getPosts(
//        @PathVariable("id") String userId,
//        @ApiIgnore ServerWebExchange exchange
//    ) {
//        Flux<Post> postFlux = postService.getPostsByUser(userId);
//
//        return assembler.toCollectionModel(postFlux, exchange);
//    }
//
//    @GetMapping(path = "/{postId}")
//    public Mono<EntityModel<Post>> getPost(
//        @PathVariable("id") String targetId,
//        @PathVariable("postId") Long postId,
//        @ApiIgnore ServerWebExchange exchange
//    ) {
//        return exchange.getPrincipal()
//            .flatMap(principal -> {
//                if (principal instanceof AbstractAuthenticationToken) {
//                    return userService.getUserFromAuthentication((AbstractAuthenticationToken) principal)
//                        .flatMap(user -> postService.getPostByAnotherUser(targetId, user.getId(), postId)
//                            .flatMap(post -> assembler.toModel(post, exchange))
//                        );
//                } else {
//                    return Mono.error(new BadRequestAlertException("Invalid user", "user", "principalinvalid"));
//                }
//            });
//    }
//
//}
