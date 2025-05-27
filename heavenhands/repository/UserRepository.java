package com.example.heavenhands.repository;

import com.example.heavenhands.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    @Query("SELECT u.organizationName FROM User u WHERE u.roleplay = 'orphanage'")
    List<String> findAllOrphanageNames();
    @Query("SELECT u.organizationName FROM User u WHERE u.id = :id")
    Optional<String> findOrganizationNameById(Long id);
 // 1a) All orphanage emails
    @Query("SELECT u.email FROM User u WHERE u.roleplay = 'Orphanage'")
    List<String> findAllOrphanageEmails();
    @Query("SELECT u.email FROM User u WHERE u.roleplay = 'Volunteer'")
    List<String> findAllVolunteerEmails();
    @Query("SELECT u.email FROM User u WHERE u.roleplay = 'donor'")
    List<String> findAllDonorEmails();
    Optional<User> findByOrganizationName(String organizationName);
    Optional<User> findFirstByOrganizationName(String organizationName);

}
