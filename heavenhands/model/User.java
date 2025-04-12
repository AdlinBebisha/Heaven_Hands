package com.example.heavenhands.model;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Ensure consistency with the database column name

    @Column(name = "first_name", nullable = true) // Nullable for Orphanage
    private String firstName;

    @Column(name = "last_name", nullable = true) // Nullable for Orphanage
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @JsonProperty("phone_number") // Maps JSON key to this field
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "roleplay", nullable = false)
    private String roleplay;

    @Column(name = "organization_name", nullable = true) // Only for Orphanage
    private String organizationName;

    @Column(name = "incharge", nullable = true) // Only for Orphanage
    private String incharge;

    @Column(name = "organization_type", nullable = true) // Only for Orphanage
    private String organizationType;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "profile_picture", columnDefinition = "LONGTEXT", nullable = true)
    private String profilePicture;

    @Column(name = "availability", nullable = true)
    private String availability;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FoodDonation> foodDonations = new ArrayList<>();

    // Getters and setters
    public Long getid() {
        return id;
    }

    public void setid(Long userId) {
        this.id = userId;
    }

    // Add getter and setter for foodDonations
    public List<FoodDonation> getFoodDonations() {
        return foodDonations;
    }

    public void setFoodDonations(List<FoodDonation> foodDonations) {
        this.foodDonations = foodDonations;
    }


    // Getters and setters
    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
    
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getRoleplay() {
        return roleplay;
    }
    public void setRoleplay(String roleplay) {
        this.roleplay = roleplay;
    }
    public String getOrganizationName() {
        return organizationName;
    }
    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }
    public String getIncharge() {
        return incharge;
    }
    public void setIncharge(String incharge) {
        this.incharge = incharge;
    }
    public String getOrganizationType() {
        return organizationType;
    }
    public void setOrganizationType(String organizationType) {
        this.organizationType = organizationType;
    }
    
}
