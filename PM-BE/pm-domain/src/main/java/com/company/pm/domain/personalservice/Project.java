package com.company.pm.domain.personalservice;

import com.company.pm.common.Interval;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Embedded;
import org.springframework.data.relational.core.mapping.Table;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Table("projects")
public class Project {
    
    @Id
    private Integer id;
    
    @Column
    private String name;
    
    @Column
    private String description;
    
    private List<String> creators = new ArrayList<>();
    
    @Embedded(onEmpty = Embedded.OnEmpty.USE_NULL)
    private Interval interval;
    
    @Column
    private String url;
    
    @Transient
    private PersonalProfile profile;
}
