package com.example.demo.chat_service.service;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.userservice.domain.repositories.UserRepository;
import com.example.demo.chat_service.model.ChatMessage;
import com.example.demo.chat_service.model.MessageStatus;
import com.example.demo.chat_service.repo.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    private final UserRepository userRepository;

    private final ChatRoomService chatRoomService;

//    public ChatMessage save(ChatMessage chatMessage) {
//        chatMessage.setStatus(MessageStatus.RECEIVED);
//        repository.save(chatMessage);
//        return chatMessage;
//    }
//
//    public long countNewMessages(String senderId, String recipientId) {
//        return userRepository.countBySenderIdAndRecipientIdAndStatus(
//                senderId, recipientId, MessageStatus.RECEIVED);
//    }

    public Mono<Long> countNewMessges(String senderId, String recipientId) {
        return userRepository.findById(recipientId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMap(user -> chatMessageRepository.countAllBySenderIdAndRecipientIdAndStatus(senderId, user.getId(), MessageStatus.RECEIVED));
    }

    public Flux<ChatMessage> findChatMessages(String senderId, String recipientId) {
        return userRepository.findById(recipientId)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
                .flatMapMany(user -> chatMessageRepository.findChatMessageBySenderIdAndRecipientId(senderId, user.getId()));
    }

    public Mono<ChatMessage> findMessage(Long id) {
        return chatMessageRepository.findChatMessageById(id);
    }

    public Mono<ChatMessage> save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.RECEIVED);
        return chatMessageRepository.save(chatMessage);
    }


//    public ChatMessage findById(String id) {
//        return repository
//                .findById(id)
//                .map(chatMessage -> {
//                    chatMessage.setStatus(MessageStatus.DELIVERED);
//                    return repository.save(chatMessage);
//                })
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("can't find message (" + id + ")"));
//    }

    public Mono<ChatMessage> updateStatuses(Long id, MessageStatus status) {
        return chatMessageRepository.findById(id)
                .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "message", "idnotfound")))
                .flatMap(chatMessage -> {
                    chatMessage.setStatus(status);
                    return chatMessageRepository.save(chatMessage);
                });
    }
}
