package com.company.pm.personalservice.domain.repositories;

import com.company.pm.domain.personalservice.Education;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface EducationRepository extends R2dbcRepository<Education, Integer> {
}
