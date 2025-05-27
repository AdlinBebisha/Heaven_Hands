package com.example.heavenhands.repository;

import com.example.heavenhands.model.ItemDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDonationRepository extends JpaRepository<ItemDonation, Long> {
    List<ItemDonation> findByUserId(Long userId);
    List<ItemDonation> findByDonationTypeAndClaimedFalse(String donationType);
 // NEW: all donations claimed by this orphanage
    List<ItemDonation> findByClaimedTrueAndClaimedBy(String claimedBy);
    List<ItemDonation> findByDeliveryModeAndDonationTypeAndClaimedTrue(
    	    String deliveryMode, String donationType
    	);
    @Query("""
    	    SELECT f FROM ItemDonation f
    	     WHERE f.deliveryMode = 'Need Volunteers'
    	       AND ( f.donationType = 'Donate directly to a specific orphanage'
    	           OR f.claimed = true )
    	       AND f.volunteerEmail IS NULL
    	  """)
    	  List<ItemDonation> findOpenVolunteerTasks();
    List<ItemDonation> findByVolunteerEmail(String volunteerEmail);
}
