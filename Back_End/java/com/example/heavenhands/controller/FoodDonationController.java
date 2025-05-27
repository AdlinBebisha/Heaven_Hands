package com.example.heavenhands.controller;

import com.example.heavenhands.dto.ClaimedFoodDTO;
import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.service.FoodDonationService;
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
@RequestMapping("/api/food-donations")
public class FoodDonationController {

    @Autowired
    private FoodDonationService foodDonationService;

    @GetMapping("/available")
    public ResponseEntity<List<FoodDonationAvailableDTO>> getAvailable() {
        List<FoodDonation> list = foodDonationService.listAvailableToAll();
        List<FoodDonationAvailableDTO> dtos = list.stream()
                .map(fd -> new FoodDonationAvailableDTO(
                        fd.getId(),
                        fd.getFoodType(),
                        fd.getQuantity(),
                        fd.getDonationType(),
                        fd.getOrphanage(),
                        fd.getDeliveryMode(),
                        fd.getUser().getFirstName() + " " + fd.getUser().getLastName()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/submit")
    public FoodDonation submitDonation(@RequestBody FoodDonationRequest request) throws Exception {
        // Debugging: Log request details
        System.out.println("Request Received: " + request);

        // Process donation submission
        return foodDonationService.createDonation(request.toEntity(), request.getUserId());
    }

    @PostMapping("/{id}/claim")
    public ResponseEntity<?> claim(@PathVariable Long id, @RequestBody ClaimRequest req) {
        try {
            // Use organizationName instead of orphanageName
            FoodDonation claimed = foodDonationService.claimDonation(id, req.getOrphanageName());
            return ResponseEntity.ok(claimed);
        } catch (EntityNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(errorMap("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(errorMap("error", e.getMessage()));
        }
    }

    
    @GetMapping("/claimed")
    public ResponseEntity<List<ClaimedFoodDTO>> getClaimed(
            @RequestParam String orphanageName) {

        List<FoodDonation> claimed = foodDonationService.listClaimedByOrphanage(orphanageName);

        // Map to DTO
        List<ClaimedFoodDTO> dtos = claimed.stream()
            .map(d -> new ClaimedFoodDTO(
                d.getId(),
                d.getFoodType(),
                d.getQuantity(),
                // Build donorName from the User relationship
                d.getUser().getFirstName() + " " + d.getUser().getLastName(),
                d.getTimestamp()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // Helper to build a singleton map for error responses
    private Map<String, String> errorMap(String key, String msg) {
        Map<String, String> m = new HashMap<>();
        m.put(key, msg);
        return m;
    }

    /** DTO for available donations */
    public static record FoodDonationAvailableDTO(
            Long id,
            String foodType,
            int quantity,
            String donationType,
            String orphanage,
            String deliveryMode,
            String donorName
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

    /** DTO for submission request */
    public static class FoodDonationRequest {
        private String foodType;
        private int quantity;
        private String donationType;
        private String orphanage;
        private String deliveryMode;
        private String pickupAddress;
        private String pickupTime;
        private Long userId;

        public String getFoodType() { return foodType; }
        public void setFoodType(String foodType) { this.foodType = foodType; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        public String getDonationType() { return donationType; }
        public void setDonationType(String donationType) { this.donationType = donationType; }
        public String getOrphanage() { return orphanage; }
        public void setOrphanage(String orphanage) { this.orphanage = orphanage; }
        public String getDeliveryMode() { return deliveryMode; }
        public void setDeliveryMode(String deliveryMode) { this.deliveryMode = deliveryMode; }
        public String getPickupAddress() { return pickupAddress; }
        public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }
        public String getPickupTime() { return pickupTime; }
        public void setPickupTime(String pickupTime) { this.pickupTime = pickupTime; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public FoodDonation toEntity() {
            FoodDonation donation = new FoodDonation();
            donation.setFoodType(foodType);
            donation.setQuantity(quantity);
            donation.setDonationType(donationType);
            donation.setOrphanage(orphanage);
            donation.setDeliveryMode(deliveryMode);
            donation.setPickupAddress(pickupAddress);
            donation.setPickupTime(pickupTime != null ? java.time.LocalTime.parse(pickupTime) : null);
            return donation;
        }
    }
}
