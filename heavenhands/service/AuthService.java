package com.example.heavenhands.service;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User authenticate(String email, String rawPassword) {
        // Find user by email
        User user = userRepository.findByEmail(email).orElse(null);

        // If user is not found or passwords don't match, return null
        if (user == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            return null;
        }

        // Return the authenticated user
        return user;
    }
}
