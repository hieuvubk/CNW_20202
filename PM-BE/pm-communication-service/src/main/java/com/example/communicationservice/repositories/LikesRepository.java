package com.example.communicationservice.repositories;

import com.example.communicationservice.model.Likes;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface LikesRepository extends R2dbcRepository<Likes, Long> {

    @Query("SELECT * FROM likes entity WHERE entity.userId = :id")
    Flux<Likes> findAllByUserId(String id);

    @Query("SELECT COUNT(*) FROM likes entity WHERE entity.userId = :id")
    Mono<Long> countAllByUserId(String id);

    @Query("SELECT * FROM likes entity WHERE entity.postId = :id")
    Flux<Likes> findAllByPostId(String id);

    @Query("SELECT COUNT(*) FROM likes entity WHERE entity.postId = :id")
    Mono<Long> countAllByPostId(String id);

    @Query("SELECT * FROM likes entity WHERE entity.userId = :userid AND entity.postId = :postId")
    Mono<Likes> findByUserIdAndPostId(String userId, String postId);

    @Override
    <S extends Likes> Mono<S> save(S entity);
}
