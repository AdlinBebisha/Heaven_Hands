package com.example.heavenhands.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.repository.UserRepository;

import java.util.List;

@Service
public class VolunteerNotificationService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    public VolunteerNotificationService(JavaMailSender mailSender,
                                        UserRepository userRepository) {
        this.mailSender     = mailSender;
        this.userRepository = userRepository;
    }
    
    public void notifyVolunteersIfNeeded(FoodDonation donation) {
        // exactly the same volunteer-notification logic,
        // but build your summary off donation.getFoodType(), donation.getQuantity(), etc.

        if (!"Need Volunteers".equals(donation.getDeliveryMode())) {
            return;
        }
        String orphanageName = "Donate directly to a specific orphanage".equals(donation.getDonationType())
            ? donation.getOrphanage()
            : donation.isClaimed() ? donation.getClaimedBy() : null;
        if (orphanageName == null || orphanageName.isBlank()) {
            return;
        }
        String summary = String.format(
            "%s — %d kg; orphanage=%s; pickup address=%s; pickup time=%s",
            donation.getFoodType(),
            donation.getQuantity(),
            orphanageName,
            donation.getPickupAddress(),
            donation.getPickupTime() != null
                ? donation.getPickupTime().toString()
                : "not specified"
        );
        for (String email : userRepository.findAllVolunteerEmails()) {
            sendHtmlEmail(email, summary);
        }
    }

    public void notifyVolunteersIfNeeded(ItemDonation donation) {
        // 1) only for “Need Volunteers”
        if (!"Need Volunteers".equals(donation.getDeliveryMode())) {
            return;
        }

        String orphanageName;
        // 2a) direct-to-specific: orphanage is set on creation
        if ("Donate directly to a specific orphanage".equals(donation.getDonationType())) {
            orphanageName = donation.getOrphanage();
        }
        // 2b) open-to-all: use claimedBy once someone claims it
        else {
            if (!donation.isClaimed()) {
                return; // not yet claimed
            }
            orphanageName = donation.getClaimedBy();
        }

        // 3) sanity check
        if (orphanageName == null || orphanageName.isBlank()) {
            return;
        }

        String summary = String.format(
            "%s — %d pcs; orphanage=%s; pickup address=%s; pickup time=%s",
            donation.getItemType(),
            donation.getQuantity(),
            orphanageName,
            donation.getPickupAddress(),
            donation.getPickupTime() != null
                ? donation.getPickupTime().toString()
                : "not specified"
        );

        // 4) fetch and notify all volunteers
        List<String> volunteerEmails = userRepository.findAllVolunteerEmails();
        for (String email : volunteerEmails) {
            sendHtmlEmail(email, summary);
        }
    }

    private void sendHtmlEmail(String to, String donationSummary) {
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, "utf-8");
            helper.setTo(to);
            helper.setSubject("New Pickup Task Available");
            String html = "<html><body>"
                        + "<p>Hello Volunteer,</p>"
                        + "<p>A new pickup request needs your help:</p>"
                        + "<blockquote>" + donationSummary + "</blockquote>"
                        + "<p>Please <a href='https://localhost:3000/login'>log in</a> to accept it.</p>"
                        + "<p>Thank you,<br/>The HeavenHands Team</p>"
                        + "</body></html>";
            helper.setText(html, true);
            mailSender.send(mime);
        } catch (MessagingException ex) {
            throw new RuntimeException("Failed to send volunteer notification", ex);
        }
    }
}
