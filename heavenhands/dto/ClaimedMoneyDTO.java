package com.example.heavenhands.dto;

import java.time.LocalDateTime;

public class ClaimedMoneyDTO {
    private Long id;
    private Double amount;
    private String paymentMethod;
    private String donorName;
    private LocalDateTime timestamp;

    public ClaimedMoneyDTO(Long id,
    					  Double amount,
                          String paymentMethod,
                          String donorName,
                          LocalDateTime timestamp) {
        this.id = id;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.donorName = donorName;
        this.timestamp = timestamp;
    }

    // Getters (Jackson needs them)
    public Long getId() { return id; }
    public Double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getDonorName() { return donorName; }
    public LocalDateTime getTimestamp() { return timestamp; }
}

