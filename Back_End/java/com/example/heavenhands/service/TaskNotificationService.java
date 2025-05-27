package com.example.heavenhands.service;

import java.util.Optional;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class TaskNotificationService {

    private final JavaMailSender mailSender;
    private final UserRepository  userRepo;

    public TaskNotificationService(JavaMailSender mailSender,
                                   UserRepository userRepo) {
        this.mailSender = mailSender;
        this.userRepo   = userRepo;
    }

    /** Notify both donor & orphanage when a food donation is claimed. */
    public void notifyOnClaim(FoodDonation donation, String volunteerEmail) {
        String donorEmail    = donation.getUser().getEmail();
        String orphanOrgName = donation.getClaimedBy();
        Optional<User> opt   = userRepo.findByOrganizationName(orphanOrgName);
        String orphanEmail   = opt.map(User::getEmail).orElse(null);

        // 1) notify donor
        sendPlainEmail(
            donorEmail,
            "Your food donation was claimed",
            String.format(
              "Hi %s,\n\nYour donation of %d kg %s has been claimed by %s.\n\nThanks,\nHeavenHands",
              donation.getUser().getFirstName(),
              donation.getQuantity(),
              donation.getFoodType(),
              volunteerEmail
            )
        );

        // 2) notify orphanage
        if (orphanEmail != null) {
            sendPlainEmail(
                orphanEmail,
                "A food donation is coming your way",
                String.format(
                  "Hi %s,\n\nVolunteer %s will deliver %d kg %s to you.\n\nThanks,\nHeavenHands",
                  orphanOrgName, volunteerEmail,
                  donation.getQuantity(), donation.getFoodType()
                )
            );
        }
    }

    /** Notify both donor & orphanage when an item donation is claimed. */
    public void notifyOnClaim(ItemDonation donation, String volunteerEmail) {
        String donorEmail    = donation.getUser().getEmail();
        String orphanOrgName = donation.getClaimedBy();
        Optional<User> opt   = userRepo.findByOrganizationName(orphanOrgName);
        String orphanEmail   = opt.map(User::getEmail).orElse(null);

        sendPlainEmail(
            donorEmail,
            "Your item donation was claimed",
            String.format(
              "Hi %s,\n\nYour donation of %d pcs %s has been claimed by %s.\n\nThanks,\nHeavenHands",
              donation.getUser().getFirstName(),
              donation.getQuantity(),
              donation.getItemType(),
              volunteerEmail
            )
        );

        if (orphanEmail != null) {
            sendPlainEmail(
                orphanEmail,
                "An item donation is coming your way",
                String.format(
                  "Hi %s,\n\nVolunteer %s will deliver %d pcs %s to you.\n\nThanks,\nHeavenHands",
                  orphanOrgName, volunteerEmail,
                  donation.getQuantity(), donation.getItemType()
                )
            );
        }
    }

    /** Shared helper for plain‐text emails */
    private void sendPlainEmail(String to, String subject, String body) {
        try {
            MimeMessage    msg    = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, false, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);
            mailSender.send(msg);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
    public void notifyStatusChange(FoodDonation d, String status) {
    	  String donorEmail    = d.getUser().getEmail();
    	  String orphanEmail   = userRepo
    	    .findByOrganizationName(d.getClaimedBy())
    	    .map(User::getEmail)
    	    .orElse(null);

    	  String subject = "Food Task Status: " + status;
    	  String bodyDonor = String.format(
    	    "Hi %s,\n\nThe status of your donation #%d is now \"%s\".",
    	    d.getUser().getFirstName(), d.getId(), status
    	  );
    	  sendPlainEmail(donorEmail, subject, bodyDonor);

    	  if (orphanEmail != null) {
    	    String bodyOrphan = String.format(
    	      "Hi %s,\n\nYour requested donation #%d is now \"%s\" by volunteer %s.",
    	      d.getClaimedBy(), d.getId(), status, d.getVolunteerEmail()
    	    );
    	    sendPlainEmail(orphanEmail, subject, bodyOrphan);
    	  }
    	}

    	// Similarly for ItemDonation...
    public void notifyStatusChange(ItemDonation d, String status) {
  	  String donorEmail    = d.getUser().getEmail();
  	  String orphanEmail   = userRepo
  	    .findByOrganizationName(d.getClaimedBy())
  	    .map(User::getEmail)
  	    .orElse(null);

  	  String subject = "Item Task Status: " + status;
  	  String bodyDonor = String.format(
  	    "Hi %s,\n\nThe status of your donation #%d is now \"%s\".",
  	    d.getUser().getFirstName(), d.getId(), status
  	  );
  	  sendPlainEmail(donorEmail, subject, bodyDonor);

  	  if (orphanEmail != null) {
  	    String bodyOrphan = String.format(
  	      "Hi %s,\n\nYour requested donation #%d is now \"%s\" by volunteer %s.",
  	      d.getClaimedBy(), d.getId(), status, d.getVolunteerEmail()
  	    );
  	    sendPlainEmail(orphanEmail, subject, bodyOrphan);
  	  }
  	}

}
