package com.example.heavenhands.service;

import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.repository.FoodDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FoodDonationService {

    @Autowired
    private FoodDonationRepository donationRepository;

    public FoodDonation saveDonation(FoodDonation donation) {
        return donationRepository.save(donation);
    }
}
