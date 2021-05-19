package com.example.communicationservice.domain.repositories;

import com.example.communicationservice.model.Comment;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@SuppressWarnings("unused")
public interface CommentRepository extends R2dbcRepository<Comment, Long> {

    @Query("SELECT * FROM comment entity WHERE entity.postId = :id")
    Flux<Comment> findAllByPostId(Long id);

    @Query("SELECT COUNT(*) FROM comment entity WHERE entity.postId = :id")
    Mono<Long> countAllByPostId(Long id);

    @Query("SELECT * FROM comment entity WHERE entity.userId = :id")
    Flux<Comment> findAllByUserId(String id);

    @Query("SELECT * FROM comment entity WHERE entity.rootCommentId = :id")
    Flux<Comment> findAllByRootCommentId(Long id);

    @Query("SELECT COUNT(*) FROM comment entity WHERE entity.userId = :id")
    Mono<Long> countAllByRootCommentId(Long id);

    @Override
    Mono<Comment> findById(Long id);

    @Override
    <S extends Comment> Mono<S> save(S entity);

}
