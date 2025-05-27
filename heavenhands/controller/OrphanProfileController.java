package com.example.heavenhands.controller;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orphan-profile")
public class OrphanProfileController {

    @Autowired
    private UserRepository orphanRepository;

    // Get profile by email
    @GetMapping("/{email}")
    public ResponseEntity<User> getOrphanProfile(@PathVariable String email) {
        Optional<User> orphan = orphanRepository.findByEmail(email);
        return orphan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update profile
    @PutMapping("/{email}")
    public ResponseEntity<User> updateOrphanProfile(@PathVariable String email, @RequestBody User updatedUser) {
        Optional<User> existingOrphan = orphanRepository.findByEmail(email);

        if (existingOrphan.isPresent()) {
        	User user = existingOrphan.get();
        	user.setOrganizationName(updatedUser.getOrganizationName());
        	user.setOrganizationType(updatedUser.getOrganizationType());
        	user.setIncharge(updatedUser.getIncharge());
        	user.setEmail(updatedUser.getEmail());
        	user.setPhoneNumber(updatedUser.getPhoneNumber());
        	user.setAddress(updatedUser.getAddress());
        	user.setProfilePicture(updatedUser.getProfilePicture());
            orphanRepository.save(user);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }
}
