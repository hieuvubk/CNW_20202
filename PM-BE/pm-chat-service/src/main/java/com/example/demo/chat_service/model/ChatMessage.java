package com.example.demo.chat_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@javax.persistence.Table(name="message")
public class ChatMessage {
    @Id
    private Long id;
    private Long chatId;
    private String senderId;
    private String recipientId;
    private String senderName;
    private String recipientName;
    private String content;
    private String time;
    private MessageStatus status;

    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}
