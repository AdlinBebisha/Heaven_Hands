package com.example.heavenhands.dto;

import java.time.LocalDateTime;

public class ClaimedItemDTO {
    private Long id;
    private String itemType;
    private int quantity;
    private String donorName;
    private LocalDateTime timestamp;

    public ClaimedItemDTO(Long id,
                          String itemType,
                          int quantity,
                          String donorName,
                          LocalDateTime timestamp) {
        this.id = id;
        this.itemType = itemType;
        this.quantity = quantity;
        this.donorName = donorName;
        this.timestamp = timestamp;
    }

    // Getters (Jackson needs them)
    public Long getId() { return id; }
    public String getItemType() { return itemType; }
    public int getQuantity() { return quantity; }
    public String getDonorName() { return donorName; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
