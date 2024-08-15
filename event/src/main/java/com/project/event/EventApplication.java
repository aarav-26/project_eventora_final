package com.project.event;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
public class 		EventApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventApplication.class, args);
	}

}
