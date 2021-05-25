package com.company.pm.realtimeservice.messaging.websocket.handler;

import com.company.pm.domain.chatservice.Message;
import com.company.pm.realtimeservice.messaging.websocket.events.MessageCreatedEvent;
import com.company.pm.realtimeservice.messaging.websocket.publisher.MessageCreatedEventPublisher;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageWebSocketHandler implements WebSocketHandler {
    
    private final ObjectMapper objectMapper;
    
    private final MessageCreatedEventPublisher messageCreatedEventPublisher;
    
    @Override
    public Mono<Void> handle(WebSocketSession session) {
        Flux<MessageCreatedEvent> messageCreatedPublish = Flux.create(messageCreatedEventPublisher).share();
        Flux<WebSocketMessage> messageCreatedOutput = messageCreatedPublish.map(evt -> {
            Message message = (Message) evt.getSource();
            try {
                Map<String, String> data = new HashMap<>();
                data.put("conversation_id", message.getConversationId().toString());
                data.put("message_id", message.getId().toString());
                data.put("sender_id", message.getSenderId());
            
                return objectMapper.writeValueAsString(data);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).map(str -> session.binaryMessage(dbf -> dbf.wrap(
            str.getBytes(StandardCharsets.UTF_8)))
        );
        
        return session.send(messageCreatedOutput);
    }
}
