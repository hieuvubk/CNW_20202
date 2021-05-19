package com.example.demo.chat_service.controller;

import com.company.pm.userservice.domain.services.UserService;
import com.example.demo.chat_service.model.ChatMessage;
import com.example.demo.chat_service.model.ChatNotification;
import com.example.demo.chat_service.service.ChatMessageService;
import com.example.demo.chat_service.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(
        path = "/api/v1/chat",
        produces = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private ChatRoomService chatRoomService;

    private final UserService userService;
    
    @MessageMapping()
    public Mono<ChatMessage> processMessage(@Payload ChatMessage chatMessage) {
        Mono<ChatMessage> saved = chatMessageService.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(),"queue/messages",
                new ChatNotification(chatMessage.getSenderId(), chatMessage.getSenderName())
        );
        return saved;
    }


    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public Mono<Long> countNewMessage(@PathVariable String senderId, @PathVariable String recipientId) {
        return chatMessageService.countNewMessges(senderId, recipientId);
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public Flux<ChatMessage> findChatMessage(@PathVariable String senderId, @PathVariable String recipientId) {
        return chatMessageService.findChatMessages(senderId, recipientId);
    }

    @GetMapping("/messages/{id}")
    public Mono<ChatMessage> findMessage ( @PathVariable Long id) {
        return chatMessageService.findMessage(id);
    }
}
