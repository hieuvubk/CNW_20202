package com.company.pm.domain.personalservice;

import com.company.pm.common.EmploymentType;
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
@Table("work_experiences")
public class WorkExperience {
    
    @Id
    private Integer id;
    
    @Column
    private String title;
    
    private EmploymentType employmentType;
    
    @Column
    private String location;
    
    @Embedded(onEmpty = Embedded.OnEmpty.USE_NULL)
    private Interval interval;
    
    @Column
    private String industry;
    
    @Transient
    private PersonalProfile profile;
}
