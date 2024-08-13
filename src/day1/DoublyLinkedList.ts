class Node<T> {
    value: T;
    next: Node<T> | null = null;
    prev: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export default class DoublyLinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    public length: number = 0;

    constructor() {
    }

    prepend(item: T): void {
        const newNode = new Node(item);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
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

        if (idx === this.length) {
            this.append(item);
            return;
        }

        const newNode = new Node(item);
        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        if (current !== null) {
            newNode.prev = current.prev;
            newNode.next = current;
            if (current.prev) {
                current.prev.next = newNode;
            }
            current.prev = newNode;
            this.length++;
        }
    }

    append(item: T): void {
        const newNode = new Node(item);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.head === null) {
            return undefined;
        }

        let current: Node<T> | null = this.head;

        while (current !== null) {
            if (current.value === item) {
                if (current.prev !== null) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next !== null) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

                this.length--;
                return current.value;
            }
            current = current.next;
        }

        return undefined;
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

        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < idx) {
            current = current.next;
            currentIndex++;
        }

        if (current !== null) {
            if (current.prev !== null) {
                current.prev.next = current.next;
            } else {
                this.head = current.next;
            }

            if (current.next !== null) {
                current.next.prev = current.prev;
            } else {
                this.tail = current.prev;
            }

            this.length--;
            return current.value;
        }

        return undefined;
    }
}
