package com.example.vehicle_parking_management_system.model;

import java.time.LocalDateTime;

public class Feedback {
    
    private String id;
    private String driverId;
    private String reservationId;
    private int rating; // 1 to 5
    private String comments;
    private LocalDateTime submittedAt;

    public Feedback() {}

    public Feedback(String id, String driverId, String reservationId, int rating, String comments) {
        this.id = id;
        this.driverId = driverId;
        this.reservationId = reservationId;
        this.rating = rating;
        this.comments = comments;
        this.submittedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDriverId() { return driverId; }
    public void setDriverId(String driverId) { this.driverId = driverId; }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public String toCsvRow(){
        return String.join(",",id,driverId,reservationId,String.valueOf(rating),comments,submittedAt.toString());
    }

}
