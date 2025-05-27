// src/main/java/com/example/heavenhands/controller/RequestController.java
package com.example.heavenhands.controller;

import com.example.heavenhands.dto.RequestOverviewDTO;
import com.example.heavenhands.model.FoodRequest;
import com.example.heavenhands.model.ItemRequest;
import com.example.heavenhands.model.MoneyRequest;
import com.example.heavenhands.repository.FoodRequestRepository;
import com.example.heavenhands.repository.ItemRequestRepository;
import com.example.heavenhands.repository.MoneyRequestRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired private ItemRequestRepository itemRepo;
    @Autowired private FoodRequestRepository foodRepo;
    @Autowired private MoneyRequestRepository moneyRepo;
    @Autowired private JavaMailSender mailSender;

    // 1️⃣ ITEM
    @PostMapping("/item/{id}/notify")
    public ResponseEntity<?> notifyItem(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String donorName  = body.get("donorName");
        String donorPhone = body.get("donorPhone");
        if (donorName == null || donorPhone == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error","donorName & donorPhone are required"));
        }

        ItemRequest r = itemRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ItemRequest not found"));
        String orphanEmail = r.getUser().getEmail();
        String orphanOrg   = r.getUser().getOrganizationName();

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(orphanEmail);
        msg.setSubject("HeavenHands: Donor \"" + donorName + "\" wants to fulfill your ITEM request");
        msg.setText(
            "Hi " + orphanOrg + ",\n\n" +
            "Good news! Donor \"" + donorName + "\" (phone: " + donorPhone +
            ") is ready to fulfill your ITEM request (ID #" + id + ").\n\n" +
            "Please contact the donor to coordinate pickup/delivery.\n\n" +
            "Thank you,\nHeavenHands Team"
        );
        mailSender.send(msg);
     // 3) Mark as claimed and record donor
        r.setClaimed(true);
        r.setClaimedByDonor(donorName + " (" + donorPhone + ")");
        itemRepo.save(r);
        return ResponseEntity.ok(Map.of("message","Notification sent to " + orphanEmail));
    }

    // 2️⃣ FOOD
    @PostMapping("/food/{id}/notify")
    public ResponseEntity<?> notifyFood(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String donorName  = body.get("donorName");
        String donorPhone = body.get("donorPhone");
        if (donorName == null || donorPhone == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error","donorName & donorPhone are required"));
        }

        FoodRequest r = foodRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("FoodRequest not found"));
        String orphanEmail = r.getUser().getEmail();
        String orphanOrg   = r.getUser().getOrganizationName();

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(orphanEmail);
        msg.setSubject("HeavenHands: Donor \"" + donorName + "\" wants to fulfill your FOOD request");
        msg.setText(
            "Hi " + orphanOrg + ",\n\n" +
            "Good news! Donor \"" + donorName + "\" (phone: " + donorPhone +
            ") is ready to fulfill your FOOD request (ID #" + id + ").\n\n" +
            "Please contact the donor to coordinate pickup/delivery.\n\n" +
            "Thank you,\nHeavenHands Team"
        );
        mailSender.send(msg);
     // 3) Mark as claimed and record donor
        r.setClaimed(true);
        r.setClaimedByDonor(donorName + " (" + donorPhone + ")");
        foodRepo.save(r);
        return ResponseEntity.ok(Map.of("message","Notification sent to " + orphanEmail));
    }

    // 3️⃣ MONEY
    @PostMapping("/money/{id}/notify")
    public ResponseEntity<?> notifyMoney(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String donorName  = body.get("donorName");
        String donorPhone = body.get("donorPhone");
        if (donorName == null || donorPhone == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error","donorName & donorPhone are required"));
        }

        MoneyRequest r = moneyRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MoneyRequest not found"));
        String orphanEmail = r.getUser().getEmail();
        String orphanOrg   = r.getUser().getOrganizationName();

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(orphanEmail);
        msg.setSubject("HeavenHands: Donor \"" + donorName + "\" wants to fulfill your MONEY request");
        msg.setText(
            "Hi " + orphanOrg + ",\n\n" +
            "Good news! Donor \"" + donorName + "\" (phone: " + donorPhone +
            ") is ready to fulfill your MONEY request (ID #" + id + ").\n\n" +
            "Please contact the donor to coordinate transfer.\n\n" +
            "Thank you,\nHeavenHands Team"
        );
        mailSender.send(msg);
     // 3) Mark as claimed and record donor
        r.setClaimed(true);
        r.setClaimedByDonor(donorName + " (" + donorPhone + ")");
        moneyRepo.save(r);
        return ResponseEntity.ok(Map.of("message","Notification sent to " + orphanEmail));
    }    

    /** GET /api/requests/available */
    @GetMapping("/available")
    public ResponseEntity<List<RequestOverviewDTO>> listAll() {
        List<RequestOverviewDTO> all = new ArrayList<>();


          // Only unclaimed items:
          itemRepo.findByClaimedFalse()
            .forEach(r -> all.add(RequestOverviewDTO.fromItem(r)));

          foodRepo.findByClaimedFalse()
            .forEach(r -> all.add(RequestOverviewDTO.fromFood(r)));

          moneyRepo.findByClaimedFalse()
            .forEach(r -> all.add(RequestOverviewDTO.fromMoney(r)));

          all.sort(Comparator.comparing(RequestOverviewDTO::getRequestedAt).reversed());
          return ResponseEntity.ok(all);
        }
}
