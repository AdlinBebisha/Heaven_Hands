package com.example.heavenhands.controller;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/volunteer-profile")
public class VolunteerProfileController {

    @Autowired
    private UserRepository userRepository;

    // Get volunteer profile by email
    @GetMapping("/{email}")
    public ResponseEntity<User> getVolunteerProfile(@PathVariable String email) {
        Optional<User> volunteer = userRepository.findByEmail(email);
        if (volunteer.isPresent()) {
            return ResponseEntity.ok(volunteer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update volunteer profile by email
    @PutMapping("/{email}")
    public ResponseEntity<User> updateVolunteerProfile(@PathVariable String email, @RequestBody User updatedVolunteer) {
        Optional<User> optionalVolunteer = userRepository.findByEmail(email);
        
        if (optionalVolunteer.isPresent()) {
            User volunteer = optionalVolunteer.get();
            // Update common profile fields
            volunteer.setFirstName(updatedVolunteer.getFirstName());
            volunteer.setLastName(updatedVolunteer.getLastName());
            volunteer.setEmail(updatedVolunteer.getEmail());
            volunteer.setPhoneNumber(updatedVolunteer.getPhoneNumber());
            // Update volunteer-specific fields
            volunteer.setAvailability(updatedVolunteer.getAvailability());
            volunteer.setAddress(updatedVolunteer.getAddress());
            volunteer.setProfilePicture(updatedVolunteer.getProfilePicture());
            userRepository.save(volunteer);
            return ResponseEntity.ok(volunteer);
        }
        return ResponseEntity.notFound().build();
    }
}
