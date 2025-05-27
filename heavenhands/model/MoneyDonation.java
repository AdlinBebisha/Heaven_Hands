package com.example.heavenhands.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class MoneyDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Donor details
    private String donorName;
    private String donorEmail;

    // Donation amount in local currency (e.g. ₹)
    private Double amount;

    // Donation type: either "Make available to all orphanages" or "Donate directly to a specific orphanage"
    private String donationType;
    
    // Selected orphanage name if donation type is specific; otherwise it will be "All Orphanages"
    private String orphanage;
    
    // Payment method chosen by the donor (e.g. Credit/Debit Card, Gpay, PayPal)
    private String paymentMethod;

    // Record when the donation was submitted
    private LocalDateTime timestamp;

    // Optional: Associate with a User if a donor is logged in
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public MoneyDonation() {
        this.timestamp = LocalDateTime.now();
    }
    
    private boolean claimed = false;
    private String claimedBy;      // name of orphanage that claimed
    private String volunteerEmail;  // NEW: which volunteer claimed it


    public MoneyDonation(String donorName, String donorEmail, Double amount, String donationType,
                         String orphanage, String paymentMethod,String volunteerEmail, User user) {
        this.donorName = donorName;
        this.donorEmail = donorEmail;
        this.amount = amount;
        this.donationType = donationType;
        this.orphanage = orphanage;
        this.paymentMethod = paymentMethod;
        this.volunteerEmail=volunteerEmail;
        this.user = user;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    // ... (generate getters and setters for all fields)
    
    public Long getId() {
        return id;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
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

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public String getVolunteerEmail() {
        return volunteerEmail;
    }

    public void setVolunteerEmail(String volunteerEmail) {
        this.volunteerEmail = volunteerEmail;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    public boolean isClaimed() { 
    	return claimed; 
    }
    
    public void setClaimed(boolean claimed) { 
    	this.claimed = claimed; 
    }
    
    public String getClaimedBy() { 
    	return claimedBy; 
    }
    
    public void setClaimedBy(String claimedBy) {
    	this.claimedBy = claimedBy; 
    }
}
