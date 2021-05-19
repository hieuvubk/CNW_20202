package com.example.communicationservice.domain.repositories;

import com.example.communicationservice.model.Likes;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@SuppressWarnings("unused")
public interface LikesRepository extends R2dbcRepository<Likes, Long> {

    @Query("SELECT * FROM likes entity WHERE entity.userId = :id")
    Flux<Likes> findAllByUserId(String id);

    @Query("SELECT COUNT(*) FROM likes entity WHERE entity.userId = :id")
    Mono<Long> countAllByUserId(String id);

    @Query("SELECT * FROM likes entity WHERE entity.postId = :id")
    Flux<Likes> findAllByPostId(Long id);

    @Query("SELECT COUNT(*) FROM likes entity WHERE entity.postId = :id")
    Mono<Long> countAllByPostId(Long id);

    @Query("SELECT * FROM likes entity WHERE entity.userId = :userid AND entity.postId = :postId")
    Mono<Likes> findByUserIdAndPostId(String userId, Long postId);

    @Override
    <S extends Likes> Mono<S> save(S entity);
}
