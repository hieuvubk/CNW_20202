package com.example.communicationservice.domain.assembler;

import com.company.pm.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.example.communicationservice.controller.PostController;
import com.example.communicationservice.model.Post;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.reactive.WebFluxLinkBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.linkTo;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;

@Component
public class PostRepresentationModelAssembler
        extends SimpleIdentifiableReactiveRepresentationModelAssembler<Post> {

    public PostRepresentationModelAssembler() {
        super(PostController.class);
    }

    @Override
    protected String getCollectionName() {
        return "post";
    }

    @Override
    protected String getEntityId(EntityModel<Post> resource) {
        return resource.getContent().getId().toString();
    }

    @Override
    protected WebFluxLinkBuilder.WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(PostController.class).getPosts(exchange), exchange);
    }
}
