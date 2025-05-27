package com.example.heavenhands.repository;

import com.example.heavenhands.model.FoodDonation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {
    List<FoodDonation> findByUserId(Long userId);
    List<FoodDonation> findByDonationTypeAndClaimedFalse(String donationType);
    List<FoodDonation> findByClaimedTrueAndClaimedBy(String claimedBy);
    List<FoodDonation> findByDeliveryModeAndDonationTypeAndClaimedTrue(
    	    String deliveryMode, String donationType
    	);
    @Query("""
    	    SELECT f FROM FoodDonation f
    	     WHERE f.deliveryMode = 'Need Volunteers'
    	       AND ( f.donationType = 'Donate directly to a specific orphanage'
    	           OR f.claimed = true )
    	       AND f.volunteerEmail IS NULL
    	  """)
    	  List<FoodDonation> findOpenVolunteerTasks();
    List<FoodDonation> findByVolunteerEmail(String volunteerEmail);
}
