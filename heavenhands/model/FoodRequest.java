package com.example.heavenhands.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "food_requests")
public class FoodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private double quantity;

    @Column(length = 1000)
    private String address;

    @Column(length = 2000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime requestedAt;
 // e.g. in ItemRequest.java
    @Column(nullable = false)
    private boolean claimed = false;

    @Column(name="claimed_by_donor", length=200)
    private String claimedByDonor;
    
    @Column(nullable = false)
    private String status = "Pending"; 
    
    @Column(name="volunteer_email", length=200)
    private String volunteerEmail;

    public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getVolunteerEmail() {
		return volunteerEmail;
	}
	public void setVolunteerEmail(String volunteerEmail) {
		this.volunteerEmail = volunteerEmail;
	}

    // + getters/setters
    public boolean isClaimed() { return claimed; }
    public void setClaimed(boolean claimed) { this.claimed = claimed; }

    public String getClaimedByDonor() { return claimedByDonor; }
    public void setClaimedByDonor(String claimedByDonor) { this.claimedByDonor = claimedByDonor; }


    // Getters & setters
    public Long getId() { return id; }
    public String getFoodType() { return foodType; }
    public void setFoodType(String foodType) { this.foodType = foodType; }
    public double getQuantity() { return quantity; }
    public void setQuantity(double quantity) { this.quantity = quantity; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
}
