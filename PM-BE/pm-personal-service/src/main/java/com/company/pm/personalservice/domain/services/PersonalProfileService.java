package com.company.pm.personalservice.domain.services;

import com.company.pm.personalservice.domain.repositories.PersonalProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalProfileService {

    private final PersonalProfileRepository profileRepository;
    
    
}
