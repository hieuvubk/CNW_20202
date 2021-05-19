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
@javax.persistence.Table(name="likes")
public class Likes {
    @Id
    private Long id;
    private String userId;
    private Long postId;


    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}
