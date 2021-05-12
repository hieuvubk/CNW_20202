package com.company.pm.personalservice.main.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.company.pm.common.config.ApplicationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.company.pm.personalservice"})
public class PersonalServiceConfiguration {
    
    @Bean
    public Cloudinary cloudinary(ApplicationProperties properties) {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", properties.getCldConfig().getCloudName(),
            "api_key", properties.getCldConfig().getApiKey(),
            "api_secret", properties.getCldConfig().getApiSecret()
        ));
    }
}
