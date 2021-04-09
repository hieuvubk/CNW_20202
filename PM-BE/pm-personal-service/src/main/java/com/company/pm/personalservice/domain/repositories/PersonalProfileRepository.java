package com.company.pm.personalservice.domain.repositories;

import com.company.pm.domain.personalservice.PersonalProfile;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface PersonalProfileRepository extends R2dbcRepository<PersonalProfile, Integer> {

}
