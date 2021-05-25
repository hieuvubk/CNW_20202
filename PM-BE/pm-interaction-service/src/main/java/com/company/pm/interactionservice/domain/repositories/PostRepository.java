package com.company.pm.interactionservice.domain.repositories;

import com.company.pm.domain.interactionservice.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends R2dbcRepository<Post, Long>, PostRepositoryInternal {
    @Query("SELECT * FROM posts entity WHERE entity.author_id = :id")
    Flux<Post> findByAuthor(String id);

    @Query("SELECT * FROM posts entity WHERE entity.author_id IS NULL")
    Flux<Post> findAllWhereAuthorIsNull();
    
    @Query("SELECT * FROM posts entity WHERE entity.id = :id AND entity.author_id = :authorId")
    Mono<Post> findByIdAndAuthor(Long id, String authorId);
    
    @Query("SELECT * FROM posts entity WHERE entity.visionable != 'PRIVATE' AND entity.author_id = :userId")
    Flux<Post> findVisiblePosts(String userId);
    
    @Query("SELECT * FROM posts entity WHERE entity.visionable != 'PRIVATE' AND entity.author_id = :userId AND" +
        " entity.id = :postId")
    Mono<Post> findVisiblePostById(String userId, Long postId);
    
    @Query("SELECT * FROM posts entity WHERE entity.visionable = 'PUBLIC' AND entity.author_id = :userId")
    Flux<Post> findPublicPosts(String userId);
    
    @Query("SELECT * FROM posts entity WHERE entity.visionable = 'PUBLIC' AND entity.author_id = :userId AND" +
        " entity.id = :postId")
    Mono<Post> findPublicPostById(String userId, Long postId);

    // just to avoid having unambigous methods
    @Override
    Flux<Post> findAll();

    @Override
    Mono<Post> findById(Long id);

    @Override
    <S extends Post> Mono<S> save(S entity);
}

interface PostRepositoryInternal {
    <S extends Post> Mono<S> insert(S entity);
    <S extends Post> Mono<S> save(S entity);
    Mono<Integer> update(Post entity);

    Flux<Post> findAll();
    Mono<Post> findById(Long id);
    Flux<Post> findAllBy(Pageable pageable);
    Flux<Post> findAllBy(Pageable pageable, Criteria criteria);
}
