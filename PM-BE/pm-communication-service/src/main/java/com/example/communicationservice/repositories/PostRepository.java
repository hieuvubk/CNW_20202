package com.example.communicationservice.repositories;

import com.example.communicationservice.model.Post;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@SuppressWarnings("unused")
public interface PostRepository extends R2dbcRepository<Post, Long> {

    @Query("SELECT * FROM post entity WHERE entity.jobType LIKE '%:visionable%'")
    Flux<Post> findAllByJobType(String jobType);

    @Query("SELECT * FROM post entity WHERE entity.creatorId = :id")
    Flux<Post> findAllByCreatorId(String id);

    @Query("SELECT COUNT(*) FROM post entity WHERE entity.creatorId = :id")
    Mono<Long> countAllByCreatorId(String id);

    @Override
    Mono<Post> findById(Long id);

    @Override
    <S extends Post> Mono<S> save(S entity);


}
