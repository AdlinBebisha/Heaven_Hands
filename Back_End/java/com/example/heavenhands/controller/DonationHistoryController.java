package com.example.heavenhands.controller;

import com.example.heavenhands.dto.DonationHistoryDTO;
import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.model.MoneyDonation;
import com.example.heavenhands.repository.FoodDonationRepository;
import com.example.heavenhands.repository.ItemDonationRepository;
import com.example.heavenhands.repository.MoneyDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/donation-history")
public class DonationHistoryController {

    @Autowired
    private FoodDonationRepository foodDonationRepository;

    @Autowired
    private ItemDonationRepository itemDonationRepository;

    @Autowired
    private MoneyDonationRepository moneyDonationRepository;

    // Example endpoint: GET /api/donation-history?userId=1
    @GetMapping
    public ResponseEntity<List<DonationHistoryDTO>> getDonationHistory(@RequestParam Long userId) {
        List<DonationHistoryDTO> history = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Retrieve Food Donations
        List<FoodDonation> foodDonations = foodDonationRepository.findByUserId(userId);
        for (FoodDonation fd : foodDonations) {
            DonationHistoryDTO dto = new DonationHistoryDTO(
                    "Food",
                    fd.getTimestamp().format(formatter),
                    "Completed",
                    fd.getDeliveryMode(),
                    fd.getOrphanage() != null ? fd.getOrphanage() : "N/A"
            );
            history.add(dto);
        }

        // Retrieve Item Donations
        List<ItemDonation> itemDonations = itemDonationRepository.findByUserId(userId);
        for (ItemDonation idonation : itemDonations) {
            DonationHistoryDTO dto = new DonationHistoryDTO(
                    "Item",
                    idonation.getTimestamp().format(formatter),
                    "Completed",
                    idonation.getDeliveryMode(),
                    idonation.getOrphanage() != null ? idonation.getOrphanage() : "N/A"
            );
            history.add(dto);
        }

        // Retrieve Money Donations
        List<MoneyDonation> moneyDonations = moneyDonationRepository.findByUserId(userId);
        for (MoneyDonation md : moneyDonations) {
            // For money donations, using payment method as the mode of donation.
            DonationHistoryDTO dto = new DonationHistoryDTO(
                    "Money",
                    md.getTimestamp().format(formatter),
                    "Completed",
                    md.getPaymentMethod(),
                    md.getOrphanage() != null ? md.getOrphanage() : "N/A"
            );
            history.add(dto);
        }
        return ResponseEntity.ok(history);
    }
}
