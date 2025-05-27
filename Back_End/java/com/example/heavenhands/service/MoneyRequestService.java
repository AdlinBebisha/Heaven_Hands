package com.example.heavenhands.service;

import com.example.heavenhands.model.MoneyRequest;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.MoneyRequestRepository;
import com.example.heavenhands.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MoneyRequestService {
    @Autowired
	public MoneyRequestRepository repo;
    @Autowired
	public UserRepository userRepo;

    /** Create a new money request for a given orphanage ID */
    public MoneyRequest createRequest(MoneyRequest req, Long userId) throws Exception {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new Exception("Orphanage not found"));
        req.setUser(user);
        return repo.save(req);
    }
    
    public MoneyRequestService(MoneyRequestRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public List<MoneyRequest> getByOrphanage(Long orphanageId) {
        return repo.findByUserId(orphanageId);
    }
}
