package com.example.heavenhands.controller;

import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.dto.ClaimedItemDTO;
import com.example.heavenhands.service.ItemDonationService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/item-donations")
public class ItemDonationController {

    @Autowired
    private ItemDonationService service;

    public ItemDonationController(ItemDonationService service) {
        this.service = service;
    }


    /** GET /api/item-donations/available */
    @GetMapping("/available")
    public ResponseEntity<List<ItemDonationAvailableDTO>> getAvailable() {
        List<ItemDonation> list = service.listAvailableToAll();
        List<ItemDonationAvailableDTO> dtos = list.stream()
            .map(id -> new ItemDonationAvailableDTO(
                id.getId(),
                id.getItemType(),
                id.getQuantity(),
                id.getDonationType(),
                id.getOrphanage(),
                id.getDeliveryMode(),
                id.getUser().getFirstName() + " " + id.getUser().getLastName()
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** POST /api/item-donations/submit */
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitDonation(@RequestBody ItemDonationRequest request) throws Exception {
        ItemDonation donation = request.toEntity();
        service.createDonation(donation, request.getUserId());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Item donation submitted successfully!");
        return ResponseEntity.ok(response);
    }

    /** POST /api/item-donations/{id}/claim */
    @PostMapping("/{id}/claim")
    public ResponseEntity<?> claim(@PathVariable Long id, @RequestBody ClaimRequest req) {
        try {
            ItemDonation claimed = service.claimDonation(id, req.getOrphanageName());
            return ResponseEntity.ok(claimed);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMap("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMap("error", e.getMessage()));
        }
    }

    @GetMapping("/claimed")
    public ResponseEntity<List<ClaimedItemDTO>> getClaimed(
            @RequestParam String orphanageName) {

        List<ItemDonation> claimed = service.listClaimedByOrphanage(orphanageName);

        // Map to DTO
        List<ClaimedItemDTO> dtos = claimed.stream()
            .map(d -> new ClaimedItemDTO(
                d.getId(),
                d.getItemType(),
                d.getQuantity(),
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

    /** DTO for available item donations */
    public static record ItemDonationAvailableDTO(
        Long id,
        String itemType,
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

    /** DTO for item donation submission */
    public static class ItemDonationRequest {
        private String itemType;
        private int quantity;
        private String donationType;
        private String orphanage;
        private String deliveryMode;
        private String pickupAddress;
        private String pickupTime; // Expecting time in HH:mm format
        private Long userId;

        public String getItemType() {
            return itemType;
        }

        public void setItemType(String itemType) {
            this.itemType = itemType;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
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

        public String getDeliveryMode() {
            return deliveryMode;
        }

        public void setDeliveryMode(String deliveryMode) {
            this.deliveryMode = deliveryMode;
        }

        public String getPickupAddress() {
            return pickupAddress;
        }

        public void setPickupAddress(String pickupAddress) {
            this.pickupAddress = pickupAddress;
        }

        public String getPickupTime() {
            return pickupTime;
        }

        public void setPickupTime(String pickupTime) {
            this.pickupTime = pickupTime;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public ItemDonation toEntity() {
            ItemDonation donation = new ItemDonation();
            donation.setItemType(this.itemType);
            donation.setQuantity(this.quantity);
            donation.setDonationType(this.donationType);
            donation.setOrphanage(this.donationType.equals("Donate directly to a specific orphanage") ? this.orphanage : null);
            donation.setDeliveryMode(this.deliveryMode);
            donation.setPickupAddress(this.deliveryMode.equals("Need Volunteers") ? this.pickupAddress : null);
            donation.setPickupTime(this.deliveryMode.equals("Need Volunteers") && this.pickupTime != null && !this.pickupTime.isEmpty()
                    ? LocalTime.parse(this.pickupTime) : null);
            return donation;
        }
    }
}
