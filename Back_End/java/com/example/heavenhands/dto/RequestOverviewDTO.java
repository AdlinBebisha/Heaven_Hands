package com.example.heavenhands.dto;

import java.time.LocalDateTime;

import com.example.heavenhands.model.FoodRequest;
import com.example.heavenhands.model.ItemRequest;
import com.example.heavenhands.model.MoneyRequest;

public class RequestOverviewDTO {
    private Long id;
    private String type;
    private String itemType;
    private String foodType;
    private Integer quantity;
    private String description;
    private String orphanageName;
    private LocalDateTime requestedAt;
    private Double amount;

    // No-args constructor
    public RequestOverviewDTO() {
    }

    // All-args constructor
    public RequestOverviewDTO(Long id, String type, String itemType, String foodType, Integer quantity,
                               String description, String orphanageName, LocalDateTime requestedAt, Double amount) {
        this.id = id;
        this.type = type;
        this.itemType = itemType;
        this.foodType = foodType;
        this.quantity = quantity;
        this.description = description;
        this.orphanageName = orphanageName;
        this.requestedAt = requestedAt;
        this.amount = amount;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrphanageName() {
        return orphanageName;
    }

    public void setOrphanageName(String orphanageName) {
        this.orphanageName = orphanageName;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(LocalDateTime requestedAt) {
        this.requestedAt = requestedAt;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
 // Static factories for each request kind
    public static RequestOverviewDTO fromItem(ItemRequest r) {
        return new RequestOverviewDTO(
            r.getId(),
            "ITEM",
            r.getItemType(),
            null,
            r.getQuantity(),
            r.getDescription(),
            r.getUser().getOrganizationName(),
            r.getRequestedAt(),
            null
        );
    }

    public static RequestOverviewDTO fromFood(FoodRequest r) {
        return new RequestOverviewDTO(
            r.getId(),
            "FOOD",
            null,
            r.getFoodType(),
            r.getQuantity() == 0 ? null : (int) r.getQuantity(),
            r.getDescription(),
            r.getUser().getOrganizationName(),
            r.getRequestedAt(),
            null
        );
    }

    public static RequestOverviewDTO fromMoney(MoneyRequest r) {
        return new RequestOverviewDTO(
            r.getId(),
            "MONEY",
            null,
            null,
            null,
            r.getPurpose(),
            r.getUser().getOrganizationName(),
            r.getRequestedAt(),
            r.getAmount()
        );
    }
}
