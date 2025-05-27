package com.example.heavenhands.controller;

import com.example.heavenhands.model.FoodRequest;
import com.example.heavenhands.repository.UserRepository;
import com.example.heavenhands.service.FoodRequestService;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/food-requests")
public class FoodRequestController {

    @Autowired private FoodRequestService service;
    @Autowired private UserRepository userRepository;
    @Autowired private JavaMailSender mailSender;

    /** DTO for incoming JSON */
    public static class FoodRequestDTO {
        public String foodType;
        public double quantity;
        public String address;
        public String description;
        @JsonProperty("user_id")
        public Long userId;
    }

    /**
     * POST /api/food-requests
     * Body: { foodType, quantity, address, description, orphanageId }
     */
    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody FoodRequestDTO dto) {
        try {
            FoodRequest req = new FoodRequest();
            req.setFoodType(dto.foodType);
            req.setQuantity(dto.quantity);
            req.setAddress(dto.address);
            req.setDescription(dto.description);
            FoodRequest saved = service.createRequest(req, dto.userId);
         // 2) Notify all donors
            String subject = "New ITEM Request from " 
                             + saved.getUser().getOrganizationName();
            String text =  "Hello,\n\n"
                         + "An orphanage has requested FOOD donations:\n"
                         + "  • Type: " + saved.getFoodType() + "\n"
                         + "  • Quantity needed: " + saved.getQuantity() + "\n"
                         + "  • Address: " + saved.getAddress() + "\n\n"
                         + "Please log in to HeavenHands to view and fulfill this request.\n\n"
                         + "Thank you,\nHeavenHands Team";
            List<String> donorEmails = userRepository.findAllDonorEmails();
            for (String to : donorEmails) {
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setTo(to);
                msg.setSubject(subject);
                msg.setText(text);
                mailSender.send(msg);
            }
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            Map<String,String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    /**
     * Optional: GET /api/food-requests/by-orphanage/{id}
     * List all requests for a given orphanage.
     */
    @GetMapping("/by-orphanage/{id}")
    public ResponseEntity<List<FoodRequest>> listForOrphanage(@PathVariable Long id) {
        return ResponseEntity.ok(
            service.repo.findByUserId(id)
        );
    }
}
