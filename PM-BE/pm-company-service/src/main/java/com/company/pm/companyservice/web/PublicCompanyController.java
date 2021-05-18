package com.company.pm.companyservice.web;

import org.springframework.hateoas.MediaTypes;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
    path = "/api/v1/companies",
    produces = MediaTypes.HAL_JSON_VALUE
)
public class PublicCompanyController {


}
