package com.example.heavenhands.service;

import com.example.heavenhands.model.MoneyDonation;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.MoneyDonationRepository;
import com.example.heavenhands.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MoneyDonationService {

    private final MoneyDonationRepository repo;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public MoneyDonationService(MoneyDonationRepository repo,
                                UserRepository userRepository,
                                NotificationService notificationService) {
        this.repo = repo;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    /**
     * 1) Persist the donation
     * 2) Build a one‑line summary
     * 3) Notify orphanages (all or the specific one)
     * 4) Return the saved donation
     */
    public MoneyDonation createDonation(MoneyDonation donation, Long userId) throws Exception {
        // 1) associate user if provided
        if (userId != null) {
            User donor = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
            donation.setUser(donor);
        }

        // 2) save to DB
        MoneyDonation saved = repo.save(donation);

        // 3) build summary
        String summary = String.format(
            "₹%.2f via %s",
            saved.getAmount(),
            saved.getPaymentMethod()
        );

        // 4) notify orphanages
        notificationService.notifyOrphanages(
            saved.getDonationType(),
            saved.getOrphanage(),
            summary
        );

        return saved;
    }

    /** List all unclaimed “Make available to all orphanages” donations */
    public List<MoneyDonation> listAvailableToAll() {
        return repo.findByDonationTypeAndClaimedFalse("Make available to all orphanages");
    }

    /** Mark a donation as claimed by this orphanage */
    public MoneyDonation claimDonation(Long donationId, String orphanageName) {
        MoneyDonation donation = repo.findById(donationId)
            .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        if (donation.isClaimed()) {
            throw new IllegalStateException("Donation already claimed");
        }

        donation.setClaimed(true);
        donation.setClaimedBy(orphanageName);
        return repo.save(donation);
    }

    /** List what this orphanage has already claimed */
    public List<MoneyDonation> listClaimedByOrphanage(String orphanageName) {
        return repo.findByClaimedTrueAndClaimedBy(orphanageName);
    }
}
