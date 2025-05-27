package com.example.heavenhands.controller;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/donor-profile")
public class DonorProfileController {

    @Autowired
    private UserRepository userRepository;

    // Get profile by email
    @GetMapping("/{email}")
    public ResponseEntity<User> getDonorProfile(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update profile
    @PutMapping("/{email}")
    public ResponseEntity<User> updateDonorProfile(@PathVariable String email, @RequestBody User updatedUser) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setEmail(updatedUser.getEmail());
            user.setAddress(updatedUser.getAddress());
            user.setProfilePicture(updatedUser.getProfilePicture());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }
}
