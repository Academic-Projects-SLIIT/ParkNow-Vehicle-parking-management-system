package com.example.vehicle_parking_management_system.util;

import com.example.vehicle_parking_management_system.model.ParkingSlot;

import java.util.List;

/**
 * QuickSort implementation for sorting ParkingSlot lists by slotNumber.
 *
 * Data Structure: in-place QuickSort on a List<ParkingSlot>.
 * Used by SlotService.getAvailableSlots() before rendering the slot map.
 *
 * Time complexity: O(n log n) average, O(n²) worst case.
 */
public class QuickSort {

    private QuickSort() {} // Utility class — no instantiation

    /**
     * Sort a list of ParkingSlots ascending by slotNumber (lexicographic).
     * Mutates the list in place.
     */
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

    /**
     * Partition around the last element as pivot.
     * Compare by slotNumber lexicographically ("P-01" < "P-02" < "S-01" …).
     */
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
