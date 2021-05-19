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
@javax.persistence.Table(name="post")
public class Post {
    @Id
    private Long id;
    private String creatorId;
    private String content;
    private String time;
    private String jobType;
    private String visionable;

    public Post(String creatorId, String content, String time, String jobType, String visionable) {
        this.creatorId = creatorId;
        this.content = content;
        this.time = time;
        this.jobType = jobType;
        this.visionable = visionable;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}