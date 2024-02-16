package com.cdac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import jakarta.servlet.annotation.MultipartConfig;

@SpringBootApplication
@MultipartConfig
public class SpringDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDemoApplication.class, args);
	}

	
	
	 @Bean
	    public FilterRegistrationBean<CustomCorsFilter> corsFilter() {
	        FilterRegistrationBean<CustomCorsFilter> registrationBean = new FilterRegistrationBean<>();
	        registrationBean.setFilter(new CustomCorsFilter());
	        registrationBean.addUrlPatterns("/*"); // Adjust URL patterns as needed
	        return registrationBean;
	    }
	
}
