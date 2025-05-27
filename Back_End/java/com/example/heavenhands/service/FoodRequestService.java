package com.example.heavenhands.service;

import com.example.heavenhands.model.FoodRequest;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.FoodRequestRepository;
import com.example.heavenhands.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodRequestService {
    @Autowired public FoodRequestRepository repo;
    @Autowired public UserRepository userRepo;

    /**
     * Create a new food request for the given orphanage ID.
     */
    public FoodRequest createRequest(FoodRequest request, Long userId) throws Exception {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new Exception("Orphanage not found"));
        request.setUser(user);
        return repo.save(request);
    }
    
    public FoodRequestService(FoodRequestRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public List<FoodRequest> getByOrphanage(Long orphanageId) {
        return repo.findByUserId(orphanageId);
    }
}
