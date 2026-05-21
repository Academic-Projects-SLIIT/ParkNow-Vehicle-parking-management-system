package com.example.vehicle_parking_management_system.util;

import java.util.UUID;


public class IdGenerator {

    private IdGenerator() {}

    public static String next() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
    }

    public static String next(String prefix) {
        return prefix + "-" + next();
    }
}
