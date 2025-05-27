package com.example.heavenhands.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class ItemDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // For item donations, we store the type and quantity
    private String itemType;
    private int quantity;
    
    // Donation type: "Make available to all orphanages" or "Donate directly to a specific orphanage"
    private String donationType;
    
    // If donationType is specific, store the orphanage name
    private String orphanage;
    
    // Delivery mode, e.g. "Need Volunteers" or "Delivered by Myself"
    private String deliveryMode;
    
    // For "Need Volunteers" mode, include pickup address and time
    private String pickupAddress;
    private LocalTime pickupTime;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @CreationTimestamp
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp;
    
    private boolean claimed = false;
    
    
    private String claimedBy;      // name of orphanage that claimed
    private String volunteerEmail;  // NEW: which volunteer claimed it

    @Column(nullable = false)
    private String status = "Pending"; 
    

    public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

    // Getters and setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
    
    public String getVolunteerEmail() {
        return volunteerEmail;
    }

    public void setVolunteerEmail(String volunteerEmail) {
        this.volunteerEmail = volunteerEmail;
    }

    public LocalTime getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
 // NEW Getter for timestamp
    public LocalDateTime getTimestamp() {
        return timestamp;
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
