package com.company.pm.domain.personalservice;

import lombok.*;
import org.springframework.data.relational.core.mapping.Column;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
public class ContactInfo {
    
    @Column("phone_number")
    private String phoneNumber;
    
    @Column
    private String address;
}
