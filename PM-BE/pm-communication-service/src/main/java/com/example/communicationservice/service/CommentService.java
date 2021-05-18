package com.example.communicationservice.service;

import com.company.pm.socialservice.domain.repositories.FollowRepository;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.communicationservice.repositories.CommentRepository;
import com.example.communicationservice.repositories.LikesRepository;
import com.example.communicationservice.repositories.PostRepository;
import com.example.communicationservice.service.dto.ReplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class CommentService {

    private static final String ENTITY_NAME = "comment";

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    public Flux<ReplyDTO> getAllReplyOfComment(String cmtId) {

    }
}
