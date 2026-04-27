package com.parking.model;

public class Admin extends User {
    
    public enum AdminLevel { SUPER,FINANCE,PARKING,READONLY }

    private AdminLevel adminLevel;
    private String createdBy;
    
    public Admin() {
        super();
        setRole("ADMIN");
    }
    public Admin(String id, String name, String email, String password, String role, AdminLevel adminLevel, String createdBy) {
        super(id, name, email, password, role);
        this.adminLevel = adminLevel;
        this.createdBy = createdBy;
    }
    public AdminLevel getAdminLevel() { return adminLevel; }
    public void setAdminLevel(AdminLevel adminLevel) { this.adminLevel = adminLevel; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }  

    @Override
    public String toCsvRow() {
        return String.join(",", getId(), getName(), getEmail(), getPassword(), getRole(), adminLevel.name(), createdBy);
    }

}
