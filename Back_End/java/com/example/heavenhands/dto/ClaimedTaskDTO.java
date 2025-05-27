// src/main/java/com/example/heavenhands/dto/ClaimedTaskDTO.java
package com.example.heavenhands.dto;

import java.time.LocalDateTime;

public class ClaimedTaskDTO {
    private Long donationId;
    private String donationType;   // "FOOD" or "ITEM"
    private String summary;        // e.g. "Rice — 10 kg to Orphanage X"
    private String status;         // e.g. "Pending", "In Transit", "Delivered"
    private LocalDateTime timestamp;

    // All‐args constructor matching exactly the five fields:
    public ClaimedTaskDTO(
            Long donationId,
            String donationType,
            String summary,
            String status,
            LocalDateTime timestamp
    ) {
        this.donationId   = donationId;
        this.donationType = donationType;
        this.summary      = summary;
        this.status       = status;
        this.timestamp    = timestamp;
    }

    // Getters (and optionally setters, if you need them)
    public Long getDonationId()         { return donationId; }
    public String getDonationType()     { return donationType; }
    public String getSummary()          { return summary; }
    public String getStatus()           { return status; }
    public LocalDateTime getTimestamp(){ return timestamp; }
}
