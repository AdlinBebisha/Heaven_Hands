package com.example.heavenhands.dto;

import java.time.LocalDateTime;

public class TaskOverviewDTO {
    private Long donationId;
    private String donationType;  // "FOOD", "ITEM", "MONEY"
    private String summary;
    private LocalDateTime timestamp;

    public TaskOverviewDTO(Long donationId,
                           String donationType,
                           String summary,
                           LocalDateTime timestamp) {
        this.donationId = donationId;
        this.donationType = donationType;
        this.summary = summary;
        this.timestamp = timestamp;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public String getDonationType() {
        return donationType;
    }

    public void setDonationType(String donationType) {
        this.donationType = donationType;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
