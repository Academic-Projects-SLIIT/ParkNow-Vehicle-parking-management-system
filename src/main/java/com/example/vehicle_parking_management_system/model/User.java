package com.example.vehicle_parking_management_system.model;

public class User {
    private String id;
    private String fullName;
    private String userName;
    private String email;
    private String phone;
    private String password;
    private String role;

    public User() {}

    public User(String id, String fullName, String userName, String email, String phone, String password, String role) {
        this.id = id;
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
    }

    public String getId() { return id; }
    public void setId(String id) {this.id = id;}

    public String getFullName() {return fullName;}
    public void setFullName(String fullName) {this.fullName = fullName;}

    public String getUserName() {return userName;}
    public void setUserName(String userName) {this.userName = userName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getPhone() {return phone;}
    public void setPhone(String phone) {this.phone = phone;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public String getRole() {return role;}
    public void setRole(String role) {this.role = role;}

    public String toCsvRow() {
        return String.join(",", id, fullName, userName, email, phone, password, role);
    }

}

