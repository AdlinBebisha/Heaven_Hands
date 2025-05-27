package com.example.heavenhands.controller;

import com.example.heavenhands.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orphanages")
public class OrphanageController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<List<String>> listOrphanages() {
        List<String> orphanageNames = userRepository.findAllOrphanageNames();
        return ResponseEntity.ok(orphanageNames);
    }
}