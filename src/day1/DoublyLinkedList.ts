export default class DoublyLinkedList<T> {
    // Pointers to the head and tail of the list
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    // Length of the list
    public length: number = 0;

    // Constructor to initialize an empty list
    constructor() {
    }

    // Method to add a new node at the beginning of the list
    prepend(item: T): void {
        const node = new Node(item); // Create a new node with the given item
        this.length++; // Increment the length of the list

        if (this.head === null) { // If the list is empty
            this.head = this.tail = node; // Set both head and tail to the new node
            return;
        }

        // Otherwise, insert the node at the beginning
        node.next = this.head; // Link the new node's next to the current head
        this.head.prev = node; // Link the current head's prev to the new node
        this.head = node; // Update the head to the new node
    }

    // Method to insert a new node at a specific index in the list
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) { // Check if the index is within bounds
            throw new RangeError("Index out of bounds");
        }

        if (idx === 0) { // If inserting at the beginning
            this.prepend(item); // Use the prepend method
            return;
        }

        if (idx === this.length) { // If inserting at the end
            this.append(item); // Use the append method
            return;
        }

        const node = new Node(item); // Create a new node
        let current = this.head; // Start from the head of the list
        let currentIndex = 0;

        // Traverse the list to find the correct position
        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        if (current !== null) { // If the current node is not null
            node.prev = current.prev; // Set the new node's prev to the current node's prev
            node.next = current; // Set the new node's next to the current node
            if (current.prev) { // If the current node's prev exists
                current.prev.next = node; // Link it to the new node
            }
            current.prev = node; // Link the current node's prev to the new node
            this.length++; // Increment the length of the list
        }
    }

    // Method to add a new node at the end of the list
    append(item: T): void {
        const node = new Node(item); // Create a new node
        this.length++; // Increment the length of the list

        if (this.tail === null) { // If the list is empty
            this.head = this.tail = node; // Set both head and tail to the new node
            return;
        }

        // Otherwise, insert the node at the end
        node.prev = this.tail; // Link the new node's prev to the current tail
        this.tail.next = node; // Link the current tail's next to the new node
        this.tail = node; // Update the tail to the new node
    }

    // Method to remove a node with a specific value from the list
    remove(item: T): T | undefined {
        if (this.head === null) { // If the list is empty
            return undefined; // Return undefined
        }

        let current: Node<T> | null = this.head; // Start from the head of the list

        // Traverse the list to find the node to remove
        while (current !== null) {
            if (current.value === item) { // If the current node's value matches
                if (current.prev !== null) { // If there is a previous node
                    current.prev.next = current.next; // Link it to the next node
                } else { // If removing the head
                    this.head = current.next; // Update the head
                }

                if (current.next !== null) { // If there is a next node
                    current.next.prev = current.prev; // Link it to the previous node
                } else { // If removing the tail
                    this.tail = current.prev; // Update the tail
                }

                this.length--; // Decrement the length of the list
                return current.value; // Return the value of the removed node
            }
            current = current.next; // Move to the next node
        }

        return undefined; // Return undefined if the item was not found
    }

    // Method to get the value at a specific index in the list
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { // Check if the index is within bounds
            return undefined; // Return undefined if out of bounds
        }

        let current = this.head; // Start from the head of the list
        let currentIndex = 0;

        // Traverse the list to find the node at the given index
        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        return current?.value; // Return the value of the node at the index, or undefined
    }

    // Method to remove a node at a specific index in the list
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { // Check if the index is within bounds
            return undefined; // Return undefined if out of bounds
        }

        let current = this.head; // Start from the head of the list
        let currentIndex = 0;

        // Traverse the list to find the node at the given index
        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        if (current !== null) { // If the current node is not null
            if (current.prev !== null) { // If there is a previous node
                current.prev.next = current.next; // Link it to the next node
            } else { // If removing the head
                this.head = current.next; // Update the head
            }

            if (current.next !== null) { // If there is a next node
                current.next.prev = current.prev; // Link it to the previous node
            } else { // If removing the tail
                this.tail = current.prev; // Update the tail
            }

            this.length--; // Decrement the length of the list
            return current.value; // Return the value of the removed node
        }

        return undefined; // Return undefined if the node was not found
    }
}

// Node class definition used by the DoublyLinkedList (assuming this is defined elsewhere)
class Node<T> {
    public value: T;
    public next: Node<T> | null = null;
    public prev: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
