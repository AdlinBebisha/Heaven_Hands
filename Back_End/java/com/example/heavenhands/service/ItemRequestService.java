package com.example.heavenhands.service;

import com.example.heavenhands.model.ItemRequest;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.ItemRequestRepository;
import com.example.heavenhands.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemRequestService {
    @Autowired
	public ItemRequestRepository repo;
    @Autowired
	public UserRepository userRepo;

    /** Create a new item request for a given orphanage ID */
    public ItemRequest createRequest(ItemRequest request, Long userId) throws Exception {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new Exception("Orphanage not found"));
        request.setUser(user);
        return repo.save(request);
    }
    
    public ItemRequestService(ItemRequestRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public List<ItemRequest> getByOrphanage(Long orphanageId) {
        return repo.findByUserId(orphanageId);
    }
}
