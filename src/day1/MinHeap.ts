export default class MinHeap {
    // The number of elements in the heap
    public length: number;
    // The array used to store heap elements
    private data: number[];

    // Constructor to initialize the heap with an empty array and length 0
    constructor() {
        this.data = [];
        this.length = 0;
    }

    // Insert a new value into the heap
    insert(value: number): void {
        // Place the new value at the end of the array
        this.data[this.length] = value;
        // Move the value up to its correct position to maintain the heap property
        this.heapifyUp(this.length);
        // Increment the length of the heap
        this.length++;
    }

    // Remove and return the minimum element (root) from the heap
    delete(): number {
        // If the heap is empty, return -1 as an error code
        if (this.length === 0) {
            return -1;
        }

        // Store the root value to return later
        const out = this.data[0];
        // Decrease the length of the heap
        this.length--;

        // If the heap becomes empty after removal, reset the data array and return the removed value
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        // Move the last element in the heap to the root
        this.data[0] = this.data[this.length];
        // Move the root element down to its correct position to maintain the heap property
        this.heapifyDown(0);
        // Return the removed value
        return out;
    }

    // Move the element at index `idx` down to its correct position
    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx); // Get the index of the left child
        const rightIdx = this.rightChild(idx); // Get the index of the right child

        // If the index is out of bounds or there are no children, return
        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        // Get the values of the current node and its children
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];

        // Compare the current value with its children and swap with the smaller child if necessary
        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue; // Move the right child value up
            this.data[rightIdx] = value; // Move the current value down
            this.heapifyDown(rightIdx); // Recursively heapify the affected subtree
        } else if (rightValue > leftValue && value > leftValue) {
            this.data[idx] = leftValue; // Move the left child value up
            this.data[leftIdx] = value; // Move the current value down
            this.heapifyDown(leftIdx); // Recursively heapify the affected subtree
        }
    }

    // Move the element at index `idx` up to its correct position
    private heapifyUp(idx: number): void {
        // If the element is the root, return
        if (idx === 0) {
            return;
        }

        // Calculate the index of the parent node
        const parent = this.parent(idx);
        // Get the values of the current node and its parent
        const parentValue = this.data[parent];
        const value = this.data[idx];

        // If the parent value is greater than the current value, swap them
        if (parentValue > value) {
            this.data[idx] = parentValue; // Move the parent value down
            this.data[parent] = value; // Move the current value up

            // Recursively heapify up the affected subtree
            this.heapifyUp(parent);
        }
    }

    // Helper method to calculate the index of the parent node
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    // Helper method to calculate the index of the left child node
    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    // Helper method to calculate the index of the right child node
    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
