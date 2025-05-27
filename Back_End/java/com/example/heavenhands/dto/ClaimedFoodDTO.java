package com.example.heavenhands.dto;

import java.time.LocalDateTime;

public class ClaimedFoodDTO {
    private Long id;
    private String foodType;
    private int quantity;
    private String donorName;
    private LocalDateTime timestamp;

    public ClaimedFoodDTO(Long id,
                          String foodType,
                          int quantity,
                          String donorName,
                          LocalDateTime timestamp) {
        this.id = id;
        this.foodType = foodType;
        this.quantity = quantity;
        this.donorName = donorName;
        this.timestamp = timestamp;
    }

    // Getters (Jackson needs them)
    public Long getId() { return id; }
    public String getFoodType() { return foodType; }
    public int getQuantity() { return quantity; }
    public String getDonorName() { return donorName; }
    public LocalDateTime getTimestamp() { return timestamp; }
}

