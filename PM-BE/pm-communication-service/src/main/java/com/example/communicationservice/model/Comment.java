package com.example.communicationservice.model;

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
public class Comment {
    @Id
    private Long id;
    private Long postId;
    private String userId;
    private Long rootCommentId;
    private String content;
    private String time;

    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}
