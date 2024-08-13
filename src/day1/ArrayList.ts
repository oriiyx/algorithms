export default class ArrayList<T> {
    private readonly items: T[]; // Underlying array to store elements
    public length: number; // Number of elements in the ArrayList

    constructor() {
        this.items = [];
        this.length = 0;
    }

    prepend(item: T): void {
        this.items.unshift(item);
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new RangeError("Index out of bounds");
        }
        this.items.splice(idx, 0, item);
        this.length++;
    }

    append(item: T): void {
        this.items.push(item);
        this.length++;
    }

    remove(item: T): T | undefined {
        const idx = this.items.indexOf(item);
        if (idx === -1) {
            return undefined;
        }
        return this.removeAt(idx);
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        return this.items[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        const removedItem = this.items.splice(idx, 1)[0];
        this.length--;
        return removedItem;
    }
}
