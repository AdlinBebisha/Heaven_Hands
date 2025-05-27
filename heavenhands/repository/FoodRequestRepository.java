package com.example.heavenhands.repository;

import com.example.heavenhands.model.FoodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {
    // Optional: list all requests for a specific orphanage
    List<FoodRequest> findByUserId(Long userId);
    List<FoodRequest> findByClaimedFalse();

}
