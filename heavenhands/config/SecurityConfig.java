package com.example.heavenhands.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf(csrf -> csrf.ignoringRequestMatchers(
	            new AntPathRequestMatcher("/api/users/signup"),
	            new AntPathRequestMatcher("/api/auth/login"),
	            new AntPathRequestMatcher("/api/reset/**"),
	            new AntPathRequestMatcher("/api/donor-profile/**"),
	            new AntPathRequestMatcher("/api/volunteer-profile/**"),
	            new AntPathRequestMatcher("/api/orphan-profile/**"),
	            new AntPathRequestMatcher("/api/orphanages/**"),
	            new AntPathRequestMatcher("/api/food-donations/**"),
	            new AntPathRequestMatcher("/api/item-donations/**"),
	            new AntPathRequestMatcher("/api/money-donations/**"),
	            new AntPathRequestMatcher("/api/need-items/**"),
	            new AntPathRequestMatcher("/api/item-requests/**"),
	            new AntPathRequestMatcher("/api/money-requests/**"),
	            new AntPathRequestMatcher("/api/food-requests/**"),
	            new AntPathRequestMatcher("/api/requests/**"),
	            new AntPathRequestMatcher("/api/tasks/**")
	        )
	        );
	    return http.build();
	}



    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        var configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // React frontend URL
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers

        var source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public HttpFirewall customHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowedHostnames(hostname -> true); // Allow all hostnames (optional).
        firewall.setAllowUrlEncodedPercent(true); // Allow encoded `%` characters.
        firewall.setAllowUrlEncodedSlash(true);   // Allow encoded `/` characters.
        return firewall;
    }
}
