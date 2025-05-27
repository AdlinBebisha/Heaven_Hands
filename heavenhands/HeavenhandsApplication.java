package com.example.heavenhands;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.boot.admin.server.config.EnableAdminServer;

@SpringBootApplication
@EnableAdminServer
public class HeavenhandsApplication {

    public static void main(String[] args) {
        SpringApplication.run(HeavenhandsApplication.class, args);
    }
}
