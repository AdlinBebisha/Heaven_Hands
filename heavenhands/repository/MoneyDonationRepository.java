package com.example.heavenhands.repository;

import com.example.heavenhands.model.MoneyDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoneyDonationRepository extends JpaRepository<MoneyDonation, Long> {
    List<MoneyDonation> findByUserId(Long userId);
    List<MoneyDonation> findByDonationTypeAndClaimedFalse(String donationType);
    List<MoneyDonation> findByClaimedTrueAndClaimedBy(String claimedBy);
    List<MoneyDonation> findByDonationTypeAndClaimedTrue(
    	    String donationType
    	);
}
