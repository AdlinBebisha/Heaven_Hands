package com.example.heavenhands.repository;

import com.example.heavenhands.model.ItemRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemRequestRepository extends JpaRepository<ItemRequest, Long> {
    // Optional: list requests for a given orphanage
    List<ItemRequest> findByUserId(Long userId);
    List<ItemRequest> findByClaimedFalse();

}
