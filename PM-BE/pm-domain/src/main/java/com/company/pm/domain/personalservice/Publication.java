package com.company.pm.domain.personalservice;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Table("publications")
public class Publication {
    
    @Id
    private Integer id;
    
    @Column
    private String title;
    
    @Column
    private String publisher;
    
    @Column
    private String description;
    
    @Column("pub_date")
    private String publicationDate;
    
    private List<String> authors = new ArrayList<>();
    
    @Column
    private String url;
    
    @Transient
    private PersonalProfile profile;
}
