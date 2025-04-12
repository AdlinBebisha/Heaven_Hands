package com.example.heavenhands.controller;

import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.User;
import com.example.heavenhands.service.FoodDonationService;
import com.example.heavenhands.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food-donations")
public class FoodDonationController {

    @Autowired
    private FoodDonationService donationService;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitDonation(@RequestBody FoodDonation donation, @RequestParam Long userId) {
        try {
            // Debugging log
            System.out.println("Received userId: " + userId);

            User user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.badRequest().body("Invalid user ID.");
            }

            donation.setUser(user);
            FoodDonation savedDonation = donationService.saveDonation(donation);
            return ResponseEntity.ok(savedDonation);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while submitting the donation.");
        }
    }
}
