package com.example.heavenhands.repository;

import com.example.heavenhands.model.MoneyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MoneyRequestRepository extends JpaRepository<MoneyRequest, Long> {
    // Optional: find all requests for a given orphanage
    List<MoneyRequest> findByUserId(Long userId);
    List<MoneyRequest> findByClaimedFalse();

}
