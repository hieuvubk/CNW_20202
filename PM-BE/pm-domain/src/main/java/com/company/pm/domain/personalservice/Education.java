package com.company.pm.domain.personalservice;

import com.company.pm.common.Interval;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Embedded;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
@Table("educations")
public class Education {
    
    @Id
    private Integer id;
    
    @Column
    private String school;
    
    @Column
    private String degree;
    
    @Column("field_of_study")
    private String fieldOfStudy;
    
    @Embedded(onEmpty = Embedded.OnEmpty.USE_NULL)
    private Interval interval;
    
    @Column
    private String grade;
    
    @Column
    private String activities;
    
    @Column
    private String description;
    
    @Transient
    private PersonalProfile profile;
}
