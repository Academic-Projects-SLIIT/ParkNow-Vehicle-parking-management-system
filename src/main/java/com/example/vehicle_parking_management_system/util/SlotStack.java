package com.example.vehicle_parking_management_system.util;

import com.example.vehicle_parking_management_system.model.ParkingSlot;


public class SlotStack {

    private static final int DEFAULT_CAPACITY = 30;

    private ParkingSlot[] data;
    private int           top;

    public SlotStack() {
        this(DEFAULT_CAPACITY);
    }

    public SlotStack(int capacity) {
        data = new ParkingSlot[capacity];
        top  = 0;
    }


    public void push(ParkingSlot slot) {
        data[top++] = slot;
    }


    public ParkingSlot pop() {
        if (isEmpty()) return null;
        ParkingSlot slot = data[--top];
        data[top] = null;
        return slot;
    }


    public ParkingSlot peek() {
        if (isEmpty()) return null;
        return data[top - 1];
    }

    public boolean isEmpty() {
        return top == 0;
    }

    public boolean isFull() {
        return top == data.length;
    }

    public int size() {
        return top;
    }

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

    public void clear() {
        for (int i = 0; i < top; i++) data[i] = null;
        top = 0;
    }
}
