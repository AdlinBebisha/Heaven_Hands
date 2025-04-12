package com.example.heavenhands.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.heavenhands.model.LoginRequest;
import com.example.heavenhands.model.User;
import com.example.heavenhands.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = new HashMap<>();
        User user = authService.authenticate(email, password);

        if (user != null) {
            response.put("message", "Login successful!");
            System.out.println("ID: " + user.getid());
            response.put("role", user.getRoleplay());
            response.put("firstname", user.getFirstName());
            response.put("lastname", user.getLastName());
            response.put("useremail", user.getEmail());
            response.put("phonenumber", user.getPhoneNumber());
            response.put("organizationname", user.getOrganizationName());
            response.put("incharge", user.getIncharge());
            response.put("organizationtype", user.getOrganizationType());
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
}
