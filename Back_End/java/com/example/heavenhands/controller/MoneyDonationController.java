package com.example.heavenhands.controller;

import com.example.heavenhands.dto.ClaimedMoneyDTO;
import com.example.heavenhands.model.MoneyDonation;
import com.example.heavenhands.service.MoneyDonationService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/money-donations")
public class MoneyDonationController {

    @Autowired
    private MoneyDonationService service;

    /** GET /api/money-donations/available */
    @GetMapping("/available")
    public ResponseEntity<List<MoneyDonationAvailableDTO>> getAvailable() {
        List<MoneyDonation> list = service.listAvailableToAll();
        List<MoneyDonationAvailableDTO> dtos = list.stream()
            .map(md -> new MoneyDonationAvailableDTO(
                md.getId(),
                md.getDonorName(),
                md.getAmount(),
                md.getDonationType(),
                md.getOrphanage(),
                md.getPaymentMethod()
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** POST /api/money-donations/submit */
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitDonation(@RequestBody MoneyDonationRequest request) throws Exception {
        MoneyDonation donation = request.toEntity();
        service.createDonation(donation, request.getUserId());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Money donation submitted successfully!");
        return ResponseEntity.ok(response);
    }

    /** POST /api/money-donations/{id}/claim */
    @PostMapping("/{id}/claim")
    public ResponseEntity<?> claim(@PathVariable Long id, @RequestBody ClaimRequest req) {
        try {
            MoneyDonation claimed = service.claimDonation(id, req.getOrphanageName());
            return ResponseEntity.ok(claimed);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMap("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMap("error", e.getMessage()));
        }
    }
    
    @GetMapping("/claimed")
    public ResponseEntity<List<ClaimedMoneyDTO>> getClaimed(
            @RequestParam String orphanageName) {

        List<MoneyDonation> claimed = service.listClaimedByOrphanage(orphanageName);

        // Map to DTO
        List<ClaimedMoneyDTO> dtos = claimed.stream()
            .map(d -> new ClaimedMoneyDTO(
                d.getId(),
                d.getAmount(),
                d.getPaymentMethod(),
                // Build donorName from the User relationship
                d.getUser().getFirstName() + " " + d.getUser().getLastName(),
                d.getTimestamp()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    /** Helper method to create error response map */
    private Map<String, String> errorMap(String key, String msg) {
        Map<String, String> map = new HashMap<>();
        map.put(key, msg);
        return map;
    }

    /** DTO for available money donations */
    public static record MoneyDonationAvailableDTO(
        Long id,
        String donorName,
        Double amount,
        String donationType,
        String orphanage,
        String paymentMethod
    ) {}

    /** DTO for claim request */
    public static class ClaimRequest {
        private String orphanageName;

        public String getOrphanageName() {
            return orphanageName;
        }

        public void setOrphanageName(String orphanageName) {
            this.orphanageName = orphanageName;
        }
    }

    /** DTO for money donation submission */
    public static class MoneyDonationRequest {
        private String name;
        private String email;
        private Double amount;
        private String donationType;
        private String orphanage;
        private String paymentMethod;
        private Long userId; // Optional: if the donor is logged in and this value is available

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Double getAmount() {
            return amount;
        }

        public void setAmount(Double amount) {
            this.amount = amount;
        }

        public String getDonationType() {
            return donationType;
        }

        public void setDonationType(String donationType) {
            this.donationType = donationType;
        }

        public String getOrphanage() {
            return orphanage;
        }

        public void setOrphanage(String orphanage) {
            this.orphanage = orphanage;
        }

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public MoneyDonation toEntity() {
            MoneyDonation donation = new MoneyDonation();
            donation.setDonorName(this.name);
            donation.setDonorEmail(this.email);
            donation.setAmount(this.amount);
            donation.setDonationType(this.donationType);
            donation.setOrphanage("Donate directly to a specific orphanage".equals(this.donationType) ? this.orphanage : "All Orphanages");
            donation.setPaymentMethod(this.paymentMethod);
            return donation;
        }
    }
}
