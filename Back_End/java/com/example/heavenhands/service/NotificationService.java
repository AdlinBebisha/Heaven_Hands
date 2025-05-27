package com.example.heavenhands.service;

import java.util.List;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class NotificationService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    public NotificationService(JavaMailSender mailSender,
                               UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    /**
     * Email all orphanages when donationType == "Make available to all orphanages"
     * or only the selected orphanage otherwise.
     */
    public void notifyOrphanages(String donationType,
                                 String orphanageName,
                                 String donationSummary) {
        if ("Make available to all orphanages".equals(donationType)) {
            // fetch all emails
            List<String> emails = userRepository.findAllOrphanageEmails();
            emails.forEach(email -> sendEmails(email, donationSummary));
        } else {
            // just one orphanage
            userRepository.findByOrganizationName(orphanageName)
                          .map(User::getEmail)
                          .ifPresent(email -> sendEmail(email, donationSummary));
        }
    }
    
    private void sendEmails(String to, String donationSummary) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("New Donation Available For You");
            helper.setText(
                "<html>"
              + "<body>"
              + "<p>Hello,</p>"
              + "<p>A new donation has been posted:</p>"
              + "<p>" + donationSummary + "</p>"
              + "<p>Please log in to HeavenHands to claim it using the link below:</p>"
              + "<p><a href='https://localhost:3000/login'>Login to HeavenHands</a></p>"
              + "<p>Thank you,<br>The HeavenHands Team</p>"
              + "</body>"
              + "</html>",
                true // Indicates this is an HTML email
            );
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private void sendEmail(String to, String donationSummary) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("New Donation Available For You");
            helper.setText(
                "<html>"
              + "<body>"
              + "<p>Hello,</p>"
              + "<p>A new donation has been posted for you:</p>"
              + "<p>" + donationSummary + "</p>"
              + "<p>Please log in to HeavenHands to claim it using the link below:</p>"
              + "<p><a href='http://localhost:3000/login'>Login to HeavenHands</a></p>"
              + "<p>Thank you,<br>The HeavenHands Team</p>"
              + "</body>"
              + "</html>",
                true // Indicates this is an HTML email
            );

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
