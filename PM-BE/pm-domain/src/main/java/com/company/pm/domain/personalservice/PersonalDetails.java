package com.company.pm.domain.personalservice;

import lombok.*;
import org.springframework.data.relational.core.mapping.Column;

import java.time.Instant;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
public class PersonalDetails {
    
    @Column
    private Instant birthday;
    
    @Column
    private String country;
    
    @Column
    private String location;
}
