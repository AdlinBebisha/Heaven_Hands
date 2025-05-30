package com.example.heavenhands.controller;

import com.example.heavenhands.model.User;
import com.example.heavenhands.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.heavenhands.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        // Debugging logs to check received user details
        System.out.println("Received User Details:");
        System.out.println("ID: " +user.getId());        
        System.out.println("First Name: " + user.getFirstName());
        System.out.println("Last Name: " + user.getLastName());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());
        System.out.println("Phone Number: " + user.getPhoneNumber());
        System.out.println("Role: " + user.getRoleplay()); // Ensure consistency


        Map<String, String> response = new HashMap<>();
        try {
            String result = userService.registerUser(user); // Business logic to save user
            response.put("message", "User registered successfully!");
            return ResponseEntity.ok(response); // Success response
        } catch (Exception e) {
            e.printStackTrace(); // Log exception details
            response.put("error", "Signup failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response); // Error response
        }
    }
    @GetMapping("/by-organization/{organizationName}")
    public ResponseEntity<User> getUserByOrganizationName(@PathVariable String organizationName) {
        Optional<User> user = userRepository.findByOrganizationName(organizationName);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
}
