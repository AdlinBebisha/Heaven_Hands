package com.example.heavenhands.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private int quantity;
    private String donationType;
    private String orphanage;
    private String deliveryMode;
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
	



    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    


    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
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
    
 // New getter for timestamp
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
