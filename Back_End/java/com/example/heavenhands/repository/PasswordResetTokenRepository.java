package com.example.heavenhands.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.heavenhands.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
