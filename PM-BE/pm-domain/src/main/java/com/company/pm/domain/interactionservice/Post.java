package com.company.pm.domain.interactionservice;

import com.company.pm.common.enumeration.Visionable;
import com.company.pm.domain.companyservice.Company;
import com.company.pm.domain.userservice.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Table("posts")
public class Post implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column("content")
    private String content;

    @Column("visionable")
    private Visionable visionable;

    @Column("created_at")
    private Instant createdAt;

    @Column("updated_at")
    private Instant updatedAt;
    
    @Transient
    private User author;

    @Column("author_id")
    private String authorId;
    
    @JsonIgnoreProperties(value = { "admin", "posts", "comments" }, allowSetters = true)
    @Transient
    private Company company;
    
    @Column("company_id")
    private Long companyId;

    @Transient
    @JsonIgnoreProperties(value = { "parentComment", "post" }, allowSetters = true)
    @Builder.Default
    private Set<Comment> comments = new HashSet<>();

    @Transient
    @JsonIgnoreProperties(value = { "post", "user" }, allowSetters = true)
    @Builder.Default
    private Set<Like> likes = new HashSet<>();
}
