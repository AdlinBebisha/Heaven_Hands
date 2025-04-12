package com.example.heavenhands.controller;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orphanages")
public class OrphanageController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<List<String>> listOrphanages() {
        List<User> orphanageUsers = userRepository.findAll().stream()
                .filter(user -> "orphanage".equalsIgnoreCase(user.getRoleplay()))
                .collect(Collectors.toList());

        List<String> orphanageNames = orphanageUsers.stream()
                .map(User::getOrganizationName)
                .filter(name -> name != null && !name.trim().isEmpty())
                .distinct()
                .collect(Collectors.toList());

        return ResponseEntity.ok(orphanageNames);
    }
}
