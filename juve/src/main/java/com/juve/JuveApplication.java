package com.juve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class JuveApplication {

//	@PostConstruct
//	void started() {
//		// timezone UTC 세팅
//		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
//	}

	public static void main(String[] args) {
		SpringApplication.run(JuveApplication.class, args);
	}

}
