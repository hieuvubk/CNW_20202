package com.example.demo.chat_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="room")
public class Room {
    @Id
    private String id;
    private String senderId;
    private String recipientId;

    public void setId(String id) {
        this.id = id;
    }

    @javax.persistence.Id
    public String getId() {
        return id;
    }
}
