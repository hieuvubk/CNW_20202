package com.company.pm.interactionservice.domain.assembler;

import com.company.pm.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.company.pm.domain.interactionservice.Comment;
import com.company.pm.interactionservice.web.CommentController;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.*;

@Component
public class CommentRepresentationModelAssembler
    extends SimpleIdentifiableReactiveRepresentationModelAssembler<Comment> {
    
    public CommentRepresentationModelAssembler() {
        super(CommentController.class);
    }
    
    @Override
    protected String getCollectionName() {
        return "comments";
    }
    
    @Override
    protected String getEntityId(EntityModel<Comment> resource) {
        return resource.getContent().getId().toString();
    }
    
    @Override
    protected WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(CommentController.class).getComments(exchange), exchange);
    }
}
