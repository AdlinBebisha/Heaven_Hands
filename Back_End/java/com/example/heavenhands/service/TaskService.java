package com.example.heavenhands.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.heavenhands.dto.ClaimedTaskDTO;
import com.example.heavenhands.dto.TaskOverviewDTO;
import com.example.heavenhands.model.FoodDonation;
import com.example.heavenhands.model.ItemDonation;
import com.example.heavenhands.repository.FoodDonationRepository;
import com.example.heavenhands.repository.ItemDonationRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TaskService {

    @Autowired private FoodDonationRepository   foodRepo;
    @Autowired private ItemDonationRepository   itemRepo;
    @Autowired private TaskNotificationService  notifier;

    /** Build a combined “open volunteer” task list for food & item. */
    public List<TaskOverviewDTO> listAvailableTasks() {
        List<TaskOverviewDTO> tasks = new ArrayList<>();

        // Food tasks
        foodRepo.findOpenVolunteerTasks().forEach(f -> {
            String orphan = f.getDonationType()
                             .equals("Donate directly to a specific orphanage")
                           ? f.getOrphanage()
                           : f.getClaimedBy();
            String summary = String.format(
                "%s — %d kg; orphanage=%s; pickup=%s; time=%s",
                f.getFoodType(),
                f.getQuantity(),
                orphan,
                f.getPickupAddress(),
                Optional.ofNullable(f.getPickupTime())
                        .map(LocalTime::toString)
                        .orElse("not specified")
            );
            tasks.add(new TaskOverviewDTO(f.getId(), "FOOD", summary, f.getTimestamp()));
        });

        // Item tasks
        itemRepo.findOpenVolunteerTasks().forEach(i -> {
            String orphan = i.getDonationType()
                             .equals("Donate directly to a specific orphanage")
                           ? i.getOrphanage()
                           : i.getClaimedBy();
            String summary = String.format(
                "%s — %d pcs; orphanage=%s; pickup=%s; time=%s",
                i.getItemType(),
                i.getQuantity(),
                orphan,
                i.getPickupAddress(),
                Optional.ofNullable(i.getPickupTime())
                        .map(LocalTime::toString)
                        .orElse("not specified")
            );
            tasks.add(new TaskOverviewDTO(i.getId(), "ITEM", summary, i.getTimestamp()));
        });

        // Newest first
        return tasks.stream()
                     .sorted(Comparator.comparing(TaskOverviewDTO::getTimestamp).reversed())
                     .toList();
    }

    /**
     * Claim either a food or item task.
     * Copies `orphanage` → `claimedBy`, marks `claimed`, sets `volunteerEmail`, saves, then notifies.
     */
    public void claimTask(String type, Long id, String volunteerEmail) {
        switch (type.toLowerCase()) {
            case "food" -> {
                FoodDonation f = foodRepo.findById(id)
                                   .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
                if (f.isClaimed()) throw new IllegalStateException("Already claimed");

                f.setClaimed(true);
                f.setVolunteerEmail(volunteerEmail);
                f.setClaimedBy(f.getOrphanage());
                FoodDonation saved = foodRepo.save(f);

                notifier.notifyOnClaim(saved, volunteerEmail);
            }
            case "item" -> {
                ItemDonation i = itemRepo.findById(id)
                                   .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
                if (i.isClaimed()) throw new IllegalStateException("Already claimed");

                i.setClaimed(true);
                i.setVolunteerEmail(volunteerEmail);
                i.setClaimedBy(i.getOrphanage());
                ItemDonation saved = itemRepo.save(i);

                notifier.notifyOnClaim(saved, volunteerEmail);
            }
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        }
    }
    public List<ClaimedTaskDTO> listClaimedTasks(String volunteerEmail) {
        List<ClaimedTaskDTO> tasks = new ArrayList<>();
        foodRepo.findByVolunteerEmail(volunteerEmail).forEach(f -> {
          tasks.add(new ClaimedTaskDTO(
            f.getId(),
            "FOOD",
            String.format("%s — %d kg to %s", 
              f.getFoodType(), f.getQuantity(), f.getClaimedBy()
            ),
            f.getStatus(),
            f.getTimestamp()
          ));
        });
        itemRepo.findByVolunteerEmail(volunteerEmail).forEach(i -> {
          tasks.add(new ClaimedTaskDTO(
            i.getId(),
            "ITEM",
            String.format("%s — %d pcs to %s", 
              i.getItemType(), i.getQuantity(), i.getClaimedBy()
            ),
            i.getStatus(),
            i.getTimestamp()
          ));
        });
        return tasks.stream()
                    .sorted(Comparator.comparing(ClaimedTaskDTO::getTimestamp).reversed())
                    .toList();
      }

      public void updateTaskStatus(String type, Long id, String newStatus) {
        switch(type.toUpperCase()) {
          case "FOOD":
            FoodDonation f = foodRepo.findById(id)
              .orElseThrow(() -> new EntityNotFoundException("Not found"));
            f.setStatus(newStatus);
            FoodDonation savedF = foodRepo.save(f);
            notifier.notifyStatusChange(savedF, newStatus);
            break;
          case "ITEM":
            ItemDonation i = itemRepo.findById(id)
              .orElseThrow(() -> new EntityNotFoundException("Not found"));
            i.setStatus(newStatus);
            ItemDonation savedI = itemRepo.save(i);
            notifier.notifyStatusChange(savedI, newStatus);
            break;
          default:
            throw new IllegalArgumentException("Unknown type");
        }
      }
}
