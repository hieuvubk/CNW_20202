package com.company.pm.personalservice.domain.repositories;

import com.company.pm.domain.personalservice.Publication;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface PublicationRepository extends R2dbcRepository<Publication, Integer> {
}
