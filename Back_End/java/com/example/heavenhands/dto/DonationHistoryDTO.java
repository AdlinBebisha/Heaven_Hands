package com.example.heavenhands.dto;

public class DonationHistoryDTO {
    private String donationType; // "Food", "Item", or "Money"
    private String date;         // A formatted date (e.g., "2025-03-06")
    private String status;       // For simplicity, using "Completed"
    private String mode;         // For food/item: deliveryMode, for money: paymentMethod
    private String orphan;       // Orphanage name if applicable

    public DonationHistoryDTO() { }

    public DonationHistoryDTO(String donationType, String date, String status, String mode, String orphan) {
        this.donationType = donationType;
        this.date = date;
        this.status = status;
        this.mode = mode;
        this.orphan = orphan;
    }

    // Getters and Setters

    public String getDonationType() {
        return donationType;
    }
    public void setDonationType(String donationType) {
        this.donationType = donationType;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMode() {
        return mode;
    }
    public void setMode(String mode) {
        this.mode = mode;
    }
    public String getOrphan() {
        return orphan;
    }
    public void setOrphan(String orphan) {
        this.orphan = orphan;
    }
}
