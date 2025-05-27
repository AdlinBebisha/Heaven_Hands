package com.example.heavenhands.service;

import com.example.heavenhands.model.PasswordResetToken;
import com.example.heavenhands.model.User;
import com.example.heavenhands.repository.PasswordResetTokenRepository;
import com.example.heavenhands.repository.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    public PasswordResetService(PasswordResetTokenRepository tokenRepository,
                                UserRepository userRepository,
                                JavaMailSender mailSender,BCryptPasswordEncoder passwordEncoder) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public void sendResetLink(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("No user found with this email!"));

        // Generate and save token
        String resetToken = UUID.randomUUID().toString();
        PasswordResetToken token = new PasswordResetToken(resetToken, LocalDateTime.now().plusHours(48), user);
        tokenRepository.save(token);

        // Send reset email
        sendEmail(user.getEmail(), resetToken);
    }

    private void sendEmail(String email, String resetToken) {
        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link below to reset your password:\n" + resetUrl);

        mailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) throws Exception {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new Exception("Invalid or expired token."));

        if (resetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new Exception("Token has expired.");
        }

        User user = resetToken.getUser();
        if (user == null) {
            throw new Exception("Associated user not found.");
        }

        // Encode the new password
        String encodedPassword = passwordEncoder.encode(newPassword);
        
     // Debugging statements
        System.out.println("Encoded Password: " + encodedPassword);
        System.out.println("Saving user with ID: " + user.getId());

        user.setPassword(encodedPassword);

        // Save the updated user
        userRepository.save(user);

        // Clean up token
        tokenRepository.delete(resetToken);
    }
}
