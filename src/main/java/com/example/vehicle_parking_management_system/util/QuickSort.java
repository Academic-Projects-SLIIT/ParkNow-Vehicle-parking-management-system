package com.example.vehicle_parking_management_system.util;

import com.example.vehicle_parking_management_system.model.ParkingSlot;

import java.util.List;


public class QuickSort {

    private QuickSort() {}


    public static void sort(List<ParkingSlot> slots) {
        if (slots == null || slots.size() <= 1) return;
        quickSort(slots, 0, slots.size() - 1);
    }

    private static void quickSort(List<ParkingSlot> slots, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(slots, low, high);
            quickSort(slots, low,           pivotIndex - 1);
            quickSort(slots, pivotIndex + 1, high);
        }
    }


    private static int partition(List<ParkingSlot> slots, int low, int high) {
        String pivot = slots.get(high).getSlotNumber();
        int    i     = low - 1;

        for (int j = low; j < high; j++) {
            if (slots.get(j).getSlotNumber().compareTo(pivot) <= 0) {
                i++;
                swap(slots, i, j);
            }
        }
        swap(slots, i + 1, high);
        return i + 1;
    }

    private static void swap(List<ParkingSlot> slots, int a, int b) {
        ParkingSlot tmp = slots.get(a);
        slots.set(a, slots.get(b));
        slots.set(b, tmp);
    }
}
