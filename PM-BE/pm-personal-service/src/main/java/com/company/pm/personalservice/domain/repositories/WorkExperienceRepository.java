package com.company.pm.personalservice.domain.repositories;

import com.company.pm.domain.personalservice.WorkExperience;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface WorkExperienceRepository extends R2dbcRepository<WorkExperience, Integer> {
}
