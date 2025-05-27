package com.example.heavenhands.service;

import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.ItemDonationRepository;
import com.example.heavenhands.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ItemDonationService {

    private final ItemDonationRepository repo;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final VolunteerNotificationService volunteerNotifier;

    public ItemDonationService(ItemDonationRepository repo,
                               UserRepository userRepository,
                               NotificationService notificationService,
                               VolunteerNotificationService volunteerNotifier) {
        this.repo               = repo;
        this.userRepository     = userRepository;
        this.notificationService= notificationService;
        this.volunteerNotifier  = volunteerNotifier;
    }

    public ItemDonation createDonation(ItemDonation donation, Long userId) throws Exception {
        // 1) load donor
        User donor = userRepository.findById(userId)
            .orElseThrow(() -> new Exception("User not found"));
        donation.setUser(donor);

        // 2) persist
        ItemDonation saved = repo.save(donation);

        // 3) notify orphanages as before
        String summary = String.format(
            "%s — %d pcs; type=%s; mode=%s; orphanage=%s",
            saved.getItemType(),
            saved.getQuantity(),
            saved.getDonationType(),
            saved.getDeliveryMode(),
            saved.getOrphanage()
        );
        notificationService.notifyOrphanages(
            saved.getDonationType(),
            saved.getOrphanage(),
            summary
        );

     // **now** notify volunteers (uses the updated orphanage-based logic)
        volunteerNotifier.notifyVolunteersIfNeeded(saved);

        // 5) return
        return saved;
    }

    /**
     * When an orphanage claims the donation, set claimedBy and THEN notify volunteers
     */
    public ItemDonation claimDonation(Long donationId, String orphanageName) {
        ItemDonation donation = repo.findById(donationId)
            .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        if (donation.isClaimed()) {
            throw new IllegalStateException("Donation is already claimed");
        }

        // mark as claimed
        donation.setClaimed(true);
        donation.setClaimedBy(orphanageName);
        ItemDonation updated = repo.save(donation);

        // ONLY now do we notify volunteers (since claimedBy and pickupAddress exist)
        volunteerNotifier.notifyVolunteersIfNeeded(updated);

        return updated;
    }
    
    public List<ItemDonation> listAvailableToAll() {
        return repo.findByDonationTypeAndClaimedFalse("Make available to all orphanages");
    }

    /** List what this orphanage has already claimed */
    public List<ItemDonation> listClaimedByOrphanage(String orphanageName) {
        return repo.findByClaimedTrueAndClaimedBy(orphanageName);
    }
}
