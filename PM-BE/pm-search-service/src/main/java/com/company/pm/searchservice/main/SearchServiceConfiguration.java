package com.company.pm.searchservice.main;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableReactiveElasticsearchRepositories;

@Configuration
@EnableReactiveElasticsearchRepositories(basePackages = {"com.company.pm.searchservice"})
@ComponentScan(basePackages = {"com.company.pm.searchservice"})
public class SearchServiceConfiguration {
}
