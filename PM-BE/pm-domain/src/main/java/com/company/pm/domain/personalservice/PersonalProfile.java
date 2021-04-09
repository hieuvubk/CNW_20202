package com.company.pm.domain.personalservice;

import com.company.pm.domain.userservice.User;
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
@Table("personal_profiles")
public class PersonalProfile {
    
    @Id
    private Integer id;
    
    @Embedded(onEmpty = Embedded.OnEmpty.USE_NULL)
    private PersonalDetails details;
    
    @Embedded(onEmpty = Embedded.OnEmpty.USE_NULL)
    private ContactInfo contactInfo;
    
    @Column
    private String about;
    
    @Transient
    private WorkExperience workExperience;
    
    @Transient
    private Education education;
    
    private List<String> certifications = new ArrayList<>();
    
    private List<String> skills = new ArrayList<>();
    
    @Transient
    private List<Project> projects = new ArrayList<>();
    
    @Transient
    private List<Publication> publications = new ArrayList<>();
    
    @Transient
    private User user;
}
