// src/main/java/com/example/heavenhands/controller/TaskController.java
package com.example.heavenhands.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.heavenhands.dto.ClaimedTaskDTO;
import com.example.heavenhands.dto.TaskOverviewDTO;
import com.example.heavenhands.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired private TaskService service;
    @Autowired private TaskService taskService;

    @GetMapping("/available")
    public ResponseEntity<List<TaskOverviewDTO>> getAvailable() {
        return ResponseEntity.ok(service.listAvailableTasks());
    }

    @PostMapping("/food/{id}/claim")
    public ResponseEntity<Map<String,String>> claimFood(
        @PathVariable("id") Long id,
        @RequestBody Map<String,String> body
    ) {
        String volunteerEmail = body.get("volunteerEmail"),
               volunteerName  = body.get("volunteerName");
        if (volunteerEmail == null || volunteerName == null) {
            return ResponseEntity
                 .badRequest()
                 .body(Map.of("error","volunteerEmail and volunteerName required"));
        }
        service.claimTask("food", id, volunteerEmail);
        return ResponseEntity.ok(Map.of("message","Task claimed successfully!"));
    }

    @PostMapping("/item/{id}/claim")
    public ResponseEntity<Map<String,String>> claimItem(
        @PathVariable("id") Long id,
        @RequestBody Map<String,String> body
    ) {
        String volunteerEmail = body.get("volunteerEmail"),
        		volunteerName  = body.get("volunteerName");
        if (volunteerEmail == null || volunteerName == null) {
            return ResponseEntity
                 .badRequest()
                 .body(Map.of("error","volunteerEmail and volunteerName required"));
        }
        service.claimTask("item", id, volunteerEmail);
        return ResponseEntity.ok(Map.of("message","Task claimed successfully!"));
    }

      // 1. List claimed
      @GetMapping("/claimed")
      public List<ClaimedTaskDTO> getClaimed(@RequestParam String volunteerEmail) {
        return taskService.listClaimedTasks(volunteerEmail);
      }

      // 2. Update status
      @PutMapping("/{type}/{id}/status")
      public ResponseEntity<Map<String,String>> updateStatus(
          @PathVariable String type,
          @PathVariable Long id,
          @RequestBody Map<String,String> body
      ) {
        String newStatus = body.get("status");
        if (newStatus == null) {
          return ResponseEntity.badRequest()
                 .body(Map.of("error","status is required"));
        }
        taskService.updateTaskStatus(type, id, newStatus);
        return ResponseEntity.ok(Map.of("message","Status updated"));
      }
    

}
