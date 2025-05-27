package com.example.heavenhands.dto;

public class DonationOverview {
    private Long taskId;            // assignment id, or 0 if unassigned
    private Long donationId;
    private String donationType;    // "food" | "item" | "money"
    private String donorName;
    private String donorPhone;
    private String orphanageName;
    private String orphanagePhone;
    private String orphanageAddress;
    private String pickupAddress;   // null for money

    // Default constructor
    public DonationOverview() {}

    // All-args constructor
    public DonationOverview(Long taskId, Long donationId, String donationType,
                            String donorName, String donorPhone,
                            String orphanageName, String orphanagePhone,
                            String orphanageAddress, String pickupAddress) {
        this.taskId = taskId;
        this.donationId = donationId;
        this.donationType = donationType;
        this.donorName = donorName;
        this.donorPhone = donorPhone;
        this.orphanageName = orphanageName;
        this.orphanagePhone = orphanagePhone;
        this.orphanageAddress = orphanageAddress;
        this.pickupAddress = pickupAddress;
    }

    // Getters and setters
    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
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

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorPhone() {
        return donorPhone;
    }

    public void setDonorPhone(String donorPhone) {
        this.donorPhone = donorPhone;
    }

    public String getOrphanageName() {
        return orphanageName;
    }

    public void setOrphanageName(String orphanageName) {
        this.orphanageName = orphanageName;
    }

    public String getOrphanagePhone() {
        return orphanagePhone;
    }

    public void setOrphanagePhone(String orphanagePhone) {
        this.orphanagePhone = orphanagePhone;
    }

    public String getOrphanageAddress() {
        return orphanageAddress;
    }

    public void setOrphanageAddress(String orphanageAddress) {
        this.orphanageAddress = orphanageAddress;
    }

    public String getPickupAddress() {
        return pickupAddress;
    }

    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }
}
