package com.example.demo.chat_service.repo;

import com.example.demo.chat_service.model.ChatMessage;
import com.example.demo.chat_service.model.MessageStatus;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ChatMessageRepository extends R2dbcRepository<ChatMessage, Long> {

    @Query("SElECT * FROM chatmessage entity WHERE entity.senderId = :senderId AND entity.recipientId = :recipientId")
    Flux<ChatMessage> findChatMessageBySenderIdAndRecipientId(String senderId, String recipientId);

    @Query("SELECT * FROM chatmessage entity WHERE entity.chatId = :chatId")
    Flux<ChatMessage> findChatMessageByChatId(Long chatId);

    @Query("SELECT * FROM chatmessage entity WHERE entity.id = :id")
    Mono<ChatMessage> findChatMessageById(Long chatId);

    @Query("SELECT * FROM chatmassage entity WHERE entity.senderId = :senderId AND entity.recipientId = :recipientId AND entity. entity.status = :status")
    Flux<ChatMessage> findChatMessageBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);

    @Query("SELECT COUNT(*) FROM chatmassage entity WHERE entity.senderId = :senderId AND entity.recipientId = :recipientId AND entity. entity.status = :status")
    Mono<Long> countAllBySenderIdAndRecipientIdAndStatus(String senderId, String recipientId, MessageStatus status);

    @Override
    Mono<ChatMessage> findById(Long id);

    @Override
    <S extends ChatMessage> Mono<S> save(S entity);
}
