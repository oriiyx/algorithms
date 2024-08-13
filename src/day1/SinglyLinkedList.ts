class Node<T> {
    value: T;
    next: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export default class SinglyLinkedList<T> {
    private head: Node<T> | null = null;
    public length: number = 0;

    constructor() {
    }

    prepend(item: T): void {
        const newNode = new Node(item);
        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new RangeError("Index out of bounds");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const newNode = new Node(item);
        let current = this.head;
        let previous: Node<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < idx) {
            previous = current;
            current = current?.next || null;
            currentIndex++;
        }

        newNode.next = current;
        previous!.next = newNode;
        this.length++;
    }

    append(item: T): void {
        const newNode = new Node(item);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.head === null) {
            return undefined;
        }

        if (this.head.value === item) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            this.length--;
            return removedValue;
        }

        let current: Node<T> | null = this.head;
        let previous: Node<T> | null = null;

        while (current !== null && current.value !== item) {
            previous = current;
            current = current.next;
        }

        if (current === null) {
            return undefined;
        }

        previous!.next = current.next;
        this.length--;
        return current.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        return current?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        if (idx === 0 && this.head !== null) {
            const removedValue = this.head.value;
            this.head = this.head.next;
            this.length--;
            return removedValue;
        }

        let current = this.head;
        let previous: Node<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < idx) {
            previous = current;
            current = current?.next || null;
            currentIndex++;
        }

        if (current === null) {
            return undefined;
        }

        previous!.next = current.next;
        this.length--;
        return current.value;
    }
}
