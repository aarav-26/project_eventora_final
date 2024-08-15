package com.project.event.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalTime;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // Register the JavaTimeModule
        objectMapper.registerModule(new JavaTimeModule());
        // Register the custom LocalTime deserializer
        SimpleModule module = new SimpleModule();
        module.addDeserializer(LocalTime.class, new CustomLocalTimeDeserializer());
        objectMapper.registerModule(module);
        return objectMapper;
    }
}

