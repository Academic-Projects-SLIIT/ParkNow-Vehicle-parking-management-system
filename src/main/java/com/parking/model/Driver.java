package com.parking.model;

public class Driver extends User{

    private String licenseNumber;
    private int vehicleCount;

    public Driver() {
        super();
        setRole("DRIVER");
    }

    public Driver(String id, String name, String email, String password, String role, String licenseNumber, int vehicleCount) {
        super(id, name, email, password, role);
        this.licenseNumber = licenseNumber;
        this.vehicleCount = vehicleCount;
    }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public int getVehicleCount() { return vehicleCount; }
    public void setVehicleCount(int vehicleCount) { this.vehicleCount = vehicleCount; }

    @Override
    public String toCsvRow() {
        return String.join(",", getId(), getName(), getEmail(), getPassword(), getRole(), licenseNumber, String.valueOf(vehicleCount));
    }

}
