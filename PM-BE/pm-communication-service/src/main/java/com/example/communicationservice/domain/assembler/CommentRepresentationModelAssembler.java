package com.example.communicationservice.domain.assembler;

import com.company.pm.common.assembler.SimpleIdentifiableReactiveRepresentationModelAssembler;
import com.example.communicationservice.controller.CommentController;
import com.example.communicationservice.model.Comment;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.reactive.WebFluxLinkBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.linkTo;
import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;

@Component
public class CommentRepresentationModelAssembler
        extends SimpleIdentifiableReactiveRepresentationModelAssembler<Comment> {

    public CommentRepresentationModelAssembler() {
        super(CommentController.class);
    }

    @Override
    protected String getCollectionName() {
        return "comment";
    }

    @Override
    protected String getEntityId(EntityModel<Comment> resource) {
        return resource.getContent().getId().toString();
    }

    @Override
    protected WebFluxLinkBuilder.WebFluxBuilder initLinkBuilder(ServerWebExchange exchange) {
        return linkTo(methodOn(CommentController.class).getComments(exchange), exchange);
    }
}