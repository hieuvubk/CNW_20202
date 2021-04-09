package com.company.pm.common;

import lombok.*;
import org.springframework.data.relational.core.mapping.Column;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
@Builder
public class Interval {
    
    @Column
    private Date startDate;
    
    @Column
    private Date endDate;
}
