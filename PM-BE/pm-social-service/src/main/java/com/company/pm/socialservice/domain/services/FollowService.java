package com.company.pm.socialservice.domain.services;

import com.company.pm.common.enumeration.RelStatus;
import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.socialservice.Follow;
import com.company.pm.domain.socialservice.Relationship;
import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.socialservice.domain.repositories.RelationshipRepository;
import com.company.pm.socialservice.domain.services.dto.FollowDTO;
import com.company.pm.socialservice.domain.services.mapper.FollowMapper;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.company.pm.userservice.domain.services.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class FollowService {
    
    private static final String ENTITY_NAME = "follow";
    
    private final FollowMapper mapper;
    
    private final FollowRepository followRepository;
    
    private final RelationshipRepository relationshipRepository;
    
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public Flux<UserDTO> getFollowersByUser(String userId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMapMany(user -> followRepository.findAllByFollowedId(user.getId())
                .flatMap(follow -> userRepository.findById(follow.getFollowerId())
                    .map(follower -> new UserDTO(follower.getId(), follower.getLogin()))
                )
            );
    }
    
    @Transactional(readOnly = true)
    public Flux<UserDTO> getFollowingsByUser(String userId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMapMany(user -> followRepository.findAllByFollowerId(user.getId())
                .flatMap(follow -> userRepository.findById(follow.getFollowedId()))
                    .map(following -> new UserDTO(following.getId(), following.getLogin()))
            );
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countFollowersByUser(String userId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> followRepository.countByFollowedId(user.getId()));
    }
    
    @Transactional(readOnly = true)
    public Mono<Long> countFollowingsByUser(String userId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> followRepository.countByFollowerId(user.getId()));
    }
    
    @Transactional
    public Mono<Follow> createFollowByUser(String userId, FollowDTO followDTO) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> {
                Follow follow = mapper.followDTOToFollow(followDTO);
                follow.setFollowerId(user.getId());
                
                return relationshipRepository.findByRequesterIdAndAddresseeId(follow.getFollowerId(), follow.getFollowedId())
                    .flatMap(relationship -> {
                        if (!relationship.getStatus().equals(RelStatus.BLOCKED)) {
                            return followRepository.findByFollowerIdAndFollowedId(follow.getFollowerId(), follow.getFollowedId())
                                .doOnNext(foundFollow -> Mono.error(new BadRequestAlertException("Invalid action", ENTITY_NAME, "idsexists")))
                                .switchIfEmpty(followRepository.save(follow));
                        } else {
                            return Mono.error(new BadRequestAlertException("Not allowed", ENTITY_NAME, "actiondenied"));
                        }
                    })
                    .switchIfEmpty(followRepository.save(follow));
            });
    }
    
    @Transactional
    public Mono<Void> deleteFollowByUser(String userId, String followedId) {
        return userRepository.findById(userId)
            .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
            .flatMap(user -> followRepository.findByFollowerIdAndFollowedId(userId, followedId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Invalid action", ENTITY_NAME, "actioninvalid")))
                .flatMap(followRepository::delete)
            );
    }
}
