package com.example.vehicle_parking_management_system.model;

public class Driver extends User{

    private String licenseNumber;
    private int vehicleCount;

    public Driver() {
        super();
        setRole("DRIVER");
    }

    public Driver(String id, String fullName, String userName, String email, String phone, String password, String licenseNumber, int vehicleCount) {
        super(id, fullName, userName, email, phone, password, "DRIVER");
        this.licenseNumber = licenseNumber;
        this.vehicleCount = vehicleCount;
    }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public int getVehicleCount() { return vehicleCount; }
    public void setVehicleCount(int vehicleCount) { this.vehicleCount = vehicleCount; }

    @Override
    public String toCsvRow() {
        return String.join(",", getId(), getFullName(), getUserName(), getEmail(), getPhone(), getPassword(), getRole(), licenseNumber, String.valueOf(vehicleCount));
    }

}
