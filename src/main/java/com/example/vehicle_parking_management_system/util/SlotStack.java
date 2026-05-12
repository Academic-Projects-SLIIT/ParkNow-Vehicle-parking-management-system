package com.example.vehicle_parking_management_system.util;

import com.example.vehicle_parking_management_system.model.ParkingSlot;

/**
 * SlotStack — custom Stack implementation for ParkingSlot allocation.
 *
 * Data Structure: Stack (LIFO) backed by an array.
 * Encapsulation: internal array and top pointer are private.
 *
 * Usage in Component 03:
 *   - push()  → called when a slot is released (vehicle departs)
 *   - pop()   → called when a slot is allocated (vehicle arrives)
 *   - peek()  → inspect next slot to be allocated without removing it
 */
public class SlotStack {

    private static final int DEFAULT_CAPACITY = 30;

    private ParkingSlot[] data;
    private int           top;  // index of the next free position

    public SlotStack() {
        this(DEFAULT_CAPACITY);
    }

    public SlotStack(int capacity) {
        data = new ParkingSlot[capacity];
        top  = 0;
    }

    /**
     * Push a slot onto the stack.
     * Called when a vehicle departs and the slot becomes available again.
     */
    public void push(ParkingSlot slot) {
        data[top++] = slot;
    }

    /**
     * Pop a slot from the stack.
     * Called when a vehicle arrives and a slot needs to be allocated.
     *
     * return the top available slot, or null if empty
     */
    public ParkingSlot pop() {
        if (isEmpty()) return null;
        ParkingSlot slot = data[--top];
        data[top] = null; // allow GC
        return slot;
    }

    /**
     * Peek at the top slot without removing it.
     */
    public ParkingSlot peek() {
        if (isEmpty()) return null;
        return data[top - 1];
    }

    /** @return true if no available slots remain in the stack */
    public boolean isEmpty() {
        return top == 0;
    }

    /** @return true if the backing array is at capacity */
    public boolean isFull() {
        return top == data.length;
    }

    /** @return number of slots currently in the stack */
    public int size() {
        return top;
    }

    /** Remove a specific slot by ID (used when a slot is put into MAINTENANCE) */
    public boolean remove(String slotId) {
        for (int i = 0; i < top; i++) {
            if (data[i] != null && data[i].getId().equals(slotId)) {
                // Shift elements left
                System.arraycopy(data, i + 1, data, i, top - i - 1);
                data[--top] = null;
                return true;
            }
        }
        return false;
    }

    /** Clear all slots from the stack */
    public void clear() {
        for (int i = 0; i < top; i++) data[i] = null;
        top = 0;
    }
}
