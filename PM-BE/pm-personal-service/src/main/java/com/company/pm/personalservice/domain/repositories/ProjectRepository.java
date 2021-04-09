package com.company.pm.personalservice.domain.repositories;

import com.company.pm.domain.personalservice.Project;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ProjectRepository extends R2dbcRepository<Project, Integer> {
}
