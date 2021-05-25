package com.company.pm.interactionservice.domain.assembler;

import com.company.pm.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.pm.domain.interactionservice.Post;
import com.company.pm.interactionservice.web.PostController;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class PostRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<Post> {
    
    public PostRepresentationModelAssembler() {
        super(PostController.class);
    }
    
    @Override
    protected String getCollectionName() {
        return "posts";
    }
    
    @Override
    protected String getEntityId(EntityModel<Post> resource) {
        return resource.getContent().getId().toString();
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(PostController.class).getPosts(exchange), exchange);
    }
}
