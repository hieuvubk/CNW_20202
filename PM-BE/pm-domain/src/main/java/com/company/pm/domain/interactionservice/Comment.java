package com.company.pm.domain.interactionservice;

import com.company.pm.domain.userservice.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Table("comments")
public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column("content")
    private String content;

    @Column("created_at")
    private Instant createdAt;

    @Column("updated_at")
    private Instant updatedAt;

    @JsonIgnoreProperties(value = { "parentComment", "post" }, allowSetters = true)
    @Transient
    private Comment parentComment;

    @Column("parent_comment_id")
    private Long parentCommentId;

    @JsonIgnoreProperties(value = { "author", "comments", "likes" }, allowSetters = true)
    @Transient
    private Post post;

    @Column("post_id")
    private Long postId;
    
    @Transient
    private User author;
    
    @Column("author_id")
    private String authorId;
}
