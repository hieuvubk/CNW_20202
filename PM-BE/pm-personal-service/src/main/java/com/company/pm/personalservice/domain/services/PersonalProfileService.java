package com.company.pm.personalservice.domain.services;

import com.company.pm.common.web.errors.BadRequestAlertException;
import com.company.pm.domain.personalservice.PersonalProfile;
import com.company.pm.personalservice.domain.repositories.PersonalProfileRepository;
import com.company.pm.personalservice.domain.services.dto.PersonalProfileDTO;
import com.company.pm.personalservice.domain.services.mapper.PersonalProfileMapper;
import com.company.pm.userservice.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.text.ParseException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PersonalProfileService {
    
    private static final String ENTITY_NAME = "personal_profile";
    
    private final PersonalProfileMapper mapper;
    
    private final PersonalProfileRepository profileRepository;
    
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public Mono<PersonalProfile> getProfileByUser(String userId) {
        return profileRepository.findByUser(userId)
            .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }
    
    @Transactional
    public Mono<PersonalProfile> createProfileByUser(String userId, PersonalProfileDTO profileDTO) {
         return userRepository.findById(userId)
             .switchIfEmpty(Mono.error(new BadRequestAlertException("Entity not found", "user", "idnotfound")))
             .flatMap(user -> {
                 try {
                     PersonalProfile profile = mapper.profileDtoToProfile(profileDTO);
                     profile.setUser(user);
                     profile.setUserId(user.getId());
    
                     return profileRepository.findByUser(userId)
                         .switchIfEmpty(profileRepository.save(profile))
                         .flatMap(found ->
                            Mono.error(new BadRequestAlertException("Entity exists", ENTITY_NAME, "idexists"))
                         );
                 } catch (ParseException e) {
                     return Mono.error(new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "dateinvalid"));
                 }
             });
    }
    
    @Transactional
    public Mono<PersonalProfile> updateProfileByUser(String userId, PersonalProfileDTO profileDTO) {
        return getProfileByUser(userId)
            .flatMap(profile -> {
                try {
                    PersonalProfile update = mapper.profileDtoToProfile(profileDTO);
    
                    if (update.getHeadline() != null) {
                        profile.setHeadline(update.getHeadline());
                    }
                    if (update.getCountry() != null) {
                        profile.setCountry(update.getCountry());
                    }
                    if (update.getLocation() != null) {
                        profile.setLocation(update.getLocation());
                    }
                    if (update.getIndustry() != null) {
                        profile.setIndustry(update.getIndustry());
                    }
                    if (update.getBirthday() != null) {
                        profile.setBirthday(update.getBirthday());
                    }
                    if (update.getPhoneNumber() != null) {
                        profile.setPhoneNumber(update.getPhoneNumber());
                    }
                    if (update.getAddress() != null) {
                        profile.setAddress(update.getAddress());
                    }
                    if (update.getAbout() != null) {
                        profile.setAbout(update.getAbout());
                    }
                    if (update.getBgImageUrl() != null) {
                        profile.setBgImageUrl(update.getBgImageUrl());
                    }
    
                    return profileRepository.save(profile);
                } catch (ParseException e) {
                    return Mono.error(new BadRequestAlertException(e.getMessage(), ENTITY_NAME, "dateinvalid"));
                }
            });
    }
}
