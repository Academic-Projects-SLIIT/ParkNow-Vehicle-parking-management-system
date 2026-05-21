package com.example.vehicle_parking_management_system.controller;

import com.example.vehicle_parking_management_system.model.ParkingSlot;
import com.example.vehicle_parking_management_system.service.AdminService;
import com.example.vehicle_parking_management_system.service.FeedbackService;
import com.example.vehicle_parking_management_system.service.SlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
public class HomeApiController {

    private final AdminService adminService;
    private final FeedbackService feedbackService;
    private final SlotService slotService;

    public HomeApiController(AdminService adminService,
                             FeedbackService feedbackService,
                             SlotService slotService) {
        this.adminService = adminService;
        this.feedbackService = feedbackService;
        this.slotService = slotService;
    }

    @GetMapping("/api/home/stats")
    public ResponseEntity<Map<String, Object>> homeStats() {
        Map<String, Object> summary = adminService.getSystemSummary();

        int totalSlots = ((Number) summary.getOrDefault("totalSlots", 0)).intValue();
        int occupied = ((Number) summary.getOrDefault("occupiedSlots", 0)).intValue();
        int available = ((Number) summary.getOrDefault("availableSlots", 0)).intValue();
        double utilPct = totalSlots > 0
                ? Math.round(occupied * 1000.0 / totalSlots) / 10.0
                : 0.0;

        double avgRating = feedbackService.calculateAverageRating();
        double hourlyRate = slotService.getAllSlots().stream()
                .findFirst()
                .map(ParkingSlot::getHourlyRate)
                .orElse(150.0);

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("totalCapacity", totalSlots);
        out.put("occupied", occupied);
        out.put("available", available);
        out.put("utilizationPercent", utilPct);
        out.put("freePercent", summary.getOrDefault("freePercent", 0.0));
        out.put("happyClients", summary.getOrDefault("totalDrivers", 0));
        out.put("totalReservations", summary.getOrDefault("totalReservations", 0));
        out.put("averageRating", avgRating);
        out.put("averageRatingDisplay", avgRating > 0
                ? String.format("%.1f / 5", avgRating)
                : "—");
        out.put("hourlyRate", hourlyRate);
        return ResponseEntity.ok(out);
    }

    @GetMapping("/api/home/feedback")
    public ResponseEntity<List<Map<String, Object>>> homeFeedback() {
        return ResponseEntity.ok(feedbackService.getPublicHighRatedFeedback(12));
    }
}
