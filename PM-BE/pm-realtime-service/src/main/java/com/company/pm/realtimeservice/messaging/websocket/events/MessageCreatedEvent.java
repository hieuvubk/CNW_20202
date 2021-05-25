package com.company.pm.realtimeservice.messaging.websocket.events;

import com.company.pm.domain.chatservice.Message;
import org.springframework.context.ApplicationEvent;

public class MessageCreatedEvent extends ApplicationEvent {
    
    public MessageCreatedEvent(Message source) {
        super(source);
    }
}
