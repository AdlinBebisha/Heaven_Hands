package com.example.heavenhands.controller;

import com.example.heavenhands.model.MoneyRequest;
import com.example.heavenhands.repository.UserRepository;
import com.example.heavenhands.service.MoneyRequestService;
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
@RequestMapping("/api/money-requests")
public class MoneyRequestController {

    @Autowired private MoneyRequestService service;
    @Autowired private UserRepository userRepository;
    @Autowired private JavaMailSender mailSender;

    /** DTO for incoming money request */
    public static class MoneyRequestDTO {
        public Double amount;
        public String purpose;
        public String address;
        public String description;
        @JsonProperty("user_id")
        public Long userId;
    }

    /** POST /api/money-requests */
    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody MoneyRequestDTO dto) {
        try {
            MoneyRequest req = new MoneyRequest();
            req.setAmount(dto.amount);
            req.setPurpose(dto.purpose);
            req.setAddress(dto.address);
            req.setDescription(dto.description);
            MoneyRequest saved = service.createRequest(req, dto.userId);
         // 2) Notify all donors
            String subject = "New ITEM Request from " 
                             + saved.getUser().getOrganizationName();
            String text =  "Hello,\n\n"
                         + "An orphanage has requested ITEM donations:\n"
                         + "  • Type: " + saved.getAmount() + "\n"
                         + "  • Quantity needed: " + saved.getPurpose() + "\n"
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

    @GetMapping("/by-orphanage/{id}")
    public ResponseEntity<?> listForOrphanage(@PathVariable Long id) {
        if (!service.userRepo.existsById(id)) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }
        List<MoneyRequest> requests = service.repo.findByUserId(id);
        return ResponseEntity.ok(requests);
    }
}
