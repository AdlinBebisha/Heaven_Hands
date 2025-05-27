package com.example.heavenhands.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "money_requests")
public class MoneyRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String purpose;

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

    // + getters/setters
    public boolean isClaimed() { return claimed; }
    public void setClaimed(boolean claimed) { this.claimed = claimed; }

    public String getClaimedByDonor() { return claimedByDonor; }
    public void setClaimedByDonor(String claimedByDonor) { this.claimedByDonor = claimedByDonor; }


    // Getters & setters…
    public Long getId() { return id; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
}
