package com.example.heavenhands.repository;

import com.example.heavenhands.model.FoodDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {
    // Additional custom methods can be added here if needed.
}
