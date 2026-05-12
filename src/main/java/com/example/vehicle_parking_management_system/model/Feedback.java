package com.example.vehicle_parking_management_system.model;

import java.time.LocalDateTime;

public class Feedback {
    
    private String id;
    private String driverId;
    private int rating; // 1 to 5
    private String comments;
    private LocalDateTime submittedAt;

    public Feedback() {}

    public Feedback(String id, String driverId, int rating, String comments) {
        this.id = id;
        this.driverId = driverId;
        this.rating = rating;
        this.comments = comments;
        this.submittedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    // Polymorphic Display Renderers for UI
    public interface RatingDisplay {
        String render(int rating);
    }

    public static class DriverRatingDisplay implements RatingDisplay {
        @Override
        public String render(int rating) {
            StringBuilder stars = new StringBuilder();
            for (int i = 0; i < 5; i++) {
                stars.append(i < rating ? "★" : "☆");
            }
            return stars.toString();
        }
    }

    public static class AdminRatingDisplay implements RatingDisplay {
        @Override
        public String render(int rating) {
            return rating + " / 5";
        }
    }

    public String toCsvRow() {
        // Matches FeedbackRepository expected format: 
        // id, driverId, rating, category, comment, submittedAt, status
        return String.join(",",
                id,
                driverId,
                String.valueOf(rating),
                "General", // Default category placeholder
                "\"" + (comments != null ? comments.replace("\"", "\"\"") : "") + "\"",
                submittedAt != null ? submittedAt.toString() : LocalDateTime.now().toString(),
                "PENDING" // Default status placeholder
        );
    }
}
