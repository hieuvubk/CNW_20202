package com.company.pm.uploadservice.web;

import com.company.pm.uploadservice.domain.services.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping(
    path = "/api/v1/storage",
    produces = MediaType.APPLICATION_JSON_VALUE
)
@RequiredArgsConstructor
public class StorageController {
    
    private final CloudinaryService cloudinaryService;
    
    @GetMapping(path = "/users/{id}/avatar")
    public Mono<Map> getAvatarUrlOfUser(@PathVariable("id") String userId) {
        return cloudinaryService.getAvatarImgOfUser(userId);
    }
}
