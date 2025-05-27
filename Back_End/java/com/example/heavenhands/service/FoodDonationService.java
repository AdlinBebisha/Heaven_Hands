package com.example.heavenhands.service;

import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.FoodDonationRepository;
import com.example.heavenhands.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FoodDonationService {

    private final FoodDonationRepository repo;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final VolunteerNotificationService volunteerNotifier;

    public FoodDonationService(FoodDonationRepository repo,
                               UserRepository userRepository,
                               NotificationService notificationService,
                               VolunteerNotificationService volunteerNotifier) {
        this.repo = repo;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.volunteerNotifier = volunteerNotifier;
    }

    /**
     * 1) Persist the donation
     * 2) Build a one-line summary
     * 3) Notify orphanages
     * 4) Notify volunteers if deliveryMode == "Need Volunteers"
     * 5) Return saved donation
     */
    public FoodDonation createDonation(FoodDonation donation, Long userId) throws Exception {
        User donor = userRepository.findById(userId)
            .orElseThrow(() -> new Exception("User not found"));
        donation.setUser(donor);

        // 1) save to DB
        FoodDonation saved = repo.save(donation);

        // 2) build summary
        String summary = String.format(
            "%s — %d kg; type=%s; mode=%s; orphanage=%s",
            saved.getFoodType(),
            saved.getQuantity(),
            saved.getDonationType(),
            saved.getDeliveryMode(),
            saved.getOrphanage()
        );

        // 3) send notifications to orphanages
        notificationService.notifyOrphanages(
            saved.getDonationType(),
            saved.getOrphanage(),
            summary
        );

        // 4) send notifications to volunteers (if needed)
        volunteerNotifier.notifyVolunteersIfNeeded(saved);

        // 5) return the persisted entity
        return saved;
    }

    /** List all unclaimed “Make available to all orphanages” donations */
    public List<FoodDonation> listAvailableToAll() {
        return repo.findByDonationTypeAndClaimedFalse("Make available to all orphanages");
    }

    /**
     * Mark a donation as claimed by this orphanage,
     * then notify volunteers if deliveryMode == "Need Volunteers"
     */
    public FoodDonation claimDonation(Long donationId, String orphanageName) {
        FoodDonation donation = repo.findById(donationId)
            .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
        if (donation.isClaimed()) {
            throw new IllegalStateException("Donation is already claimed");
        }

        // mark as claimed
        donation.setClaimed(true);
        donation.setClaimedBy(orphanageName);
        FoodDonation updated = repo.save(donation);

        // notify volunteers now that claimedBy is set
        volunteerNotifier.notifyVolunteersIfNeeded(updated);

        return updated;
    }

    /** List what this orphanage has already claimed */
    public List<FoodDonation> listClaimedByOrphanage(String orphanageName) {
        return repo.findByClaimedTrueAndClaimedBy(orphanageName);
    }
}
